import { Synapse, RPC_URLS } from '@filoz/synapse-sdk'
import { ethers } from 'ethers'

// Configuration from environment
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || '12a58016561c2fdacf2b1ada8baa930731f17d028bd3efd51a4135b789971e70'
const RPC_URL = process.env.REACT_APP_RPC_URL || RPC_URLS.calibration.http

/**
 * Upload a string to Filecoin storage and return a download link
 * @param {string} content - The string content to upload
 * @param {string} filename - Optional filename for the download (default: 'data.txt')
 * @param {function} onStatusUpdate - Optional callback for status updates
 * @returns {Promise<{cid: string, downloadUrl: string, filename: string}>}
 */
export async function uploadStringToFilecoin(content, filename = 'data.txt', onStatusUpdate = null) {
  try {
    const updateStatus = (status) => {
      if (onStatusUpdate) onStatusUpdate(status);
      console.log(`📤 ${status}`);
    };

    updateStatus('Initializing Filecoin storage...');
    
    // Initialize the SDK
    const synapse = await Synapse.create({
      withCDN: true,
      privateKey: PRIVATE_KEY,
      rpcURL: RPC_URL
    })

    updateStatus('SDK initialized successfully');

    // Create storage service with callbacks for monitoring
    const storage = await synapse.createStorage({
      callbacks: {
        onProviderSelected: (provider) => {
          updateStatus(`Selected storage provider: ${provider.owner}`);
        },
        onProofSetResolved: (info) => {
          if (info.isExisting) {
            updateStatus(`Using existing proof set: ${info.proofSetId}`);
          } else {
            updateStatus(`Created new proof set: ${info.proofSetId}`);
          }
        },
        onProofSetCreationStarted: (transaction, statusUrl) => {
          updateStatus(`Creating proof set, transaction submitted: ${transaction.hash}`);
        },
        onProofSetCreationProgress: (progress) => {
          if (progress.transactionMined && !progress.proofSetLive) {
            updateStatus('Transaction mined, waiting for proof set to be live...');
          }
        },
      },
    })

    updateStatus('Storage service created');

    // Convert string to Uint8Array
    const data = new TextEncoder().encode(content)
    updateStatus(`Preparing to upload ${data.length} bytes`);

    // Run preflight checks
    updateStatus('Running preflight checks...');
    const preflight = await storage.preflightUpload(data.length)
    updateStatus('Preflight checks completed');

    if (!preflight.allowanceCheck.sufficient) {
      throw new Error('Allowance not sufficient. Please ensure you have sufficient USDFC balance.');
    }

    // Upload the data
    updateStatus('Uploading to Filecoin...');
    const uploadResult = await storage.upload(data, {
      onUploadComplete: (commp) => {
        updateStatus(`Upload complete! CommP: ${commp}`);
      },
      onRootAdded: (transaction) => {
        if (transaction) {
          updateStatus(`Transaction confirmed: ${transaction.hash}`);
        } else {
          updateStatus('Data added to proof set');
        }
      },
      onRootConfirmed: (rootIds) => {
        updateStatus(`Root IDs assigned: ${rootIds.join(', ')}`);
      }
    })

    const cid = uploadResult.commp
    updateStatus(`Upload successful! CID: ${cid}`);

    // Get wallet address for the download URL
    const walletAddress = await synapse.getSigner().getAddress();
    
    // Create download URL using the calibration.filcdn.io format
    const downloadUrl = `https://${walletAddress}.calibration.filcdn.io/${cid}`;

    updateStatus('Download link generated successfully');

    return {
      cid: cid.toString(),
      downloadUrl,
      filename,
      size: data.length,
      provider: storage.storageProvider,
      proofSetId: storage.proofSetId,
      walletAddress: walletAddress
    }

  } catch (error) {
    console.error('❌ Upload failed:', error)
    throw new Error(`Filecoin upload failed: ${error.message}`)
  }
}

/**
 * Download a file from Filecoin using its CID
 * @param {string} cid - The CID of the file to download
 * @returns {Promise<string>} - The downloaded content as a string
 */
export async function downloadFromFilecoin(cid) {
  try {
    console.log(`📥 Downloading from CID: ${cid}`)
    
    // Initialize the SDK
    const synapse = await Synapse.create({
      withCDN: true,
      privateKey: PRIVATE_KEY,
      rpcURL: RPC_URL
    })

    // Download the data
    const data = await synapse.download(cid)
    
    // Convert back to string
    const content = new TextDecoder().decode(data)
    console.log(`✅ Download successful! Content length: ${content.length}`)
    
    return content

  } catch (error) {
    console.error('❌ Download failed:', error)
    throw new Error(`Filecoin download failed: ${error.message}`)
  }
}

/**
 * Check if the wallet has sufficient balance for uploads
 * @returns {Promise<{hasBalance: boolean, balance: string, required: string}>}
 */
export async function checkWalletBalance() {
  try {
    const synapse = await Synapse.create({
      withCDN: true,
      privateKey: PRIVATE_KEY,
      rpcURL: RPC_URL
    })

    // Check USDFC balance in payments contract
    const balance = await synapse.payments.balance()
    const walletBalance = await synapse.payments.walletBalance('USDFC')
    
    // Get current epoch for reference
    const currentEpoch = await synapse.payments.getCurrentEpoch()
    
    return {
      hasBalance: balance > 0,
      balance: ethers.formatUnits(balance, 18),
      walletBalance: ethers.formatUnits(walletBalance, 18),
      currentEpoch
    }

  } catch (error) {
    console.error('❌ Balance check failed:', error)
    throw new Error(`Balance check failed: ${error.message}`)
  }
}

/**
 * Get storage service information including pricing and providers
 * @returns {Promise<Object>} - Storage service information
 */
export async function getStorageInfo() {
  try {
    const synapse = await Synapse.create({
      withCDN: true,
      privateKey: PRIVATE_KEY,
      rpcURL: RPC_URL
    })

    const info = await synapse.getStorageInfo()
    return {
      pricing: info.pricing,
      providers: info.providers.length,
      network: info.serviceParameters.network,
      parameters: info.serviceParameters
    }

  } catch (error) {
    console.error('❌ Storage info fetch failed:', error)
    throw new Error(`Storage info fetch failed: ${error.message}`)
  }
}