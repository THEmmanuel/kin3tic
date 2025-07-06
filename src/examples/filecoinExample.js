// Example usage of Filecoin storage functionality
import { uploadStringToFilecoin, downloadFromFilecoin, checkWalletBalance } from '../utils/fildCDNHelper'

/**
 * Example: Upload a simple string and get a download link
 */
export async function uploadExample() {
  try {
    console.log('🚀 Starting Filecoin upload example...')
    
    // Example content to upload
    const content = `🚀 Welcome to decentralized storage on Filecoin!
    
This is a test upload from the Kin3tic application.
Timestamp: ${new Date().toISOString()}
    
Your data is now stored securely on the Filecoin network! 🌍`

    // Upload the content
    const result = await uploadStringToFilecoin(content, 'kin3tic-demo.txt')
    
    console.log('✅ Upload successful!')
    console.log('📋 Upload Details:')
    console.log(`   CID: ${result.cid}`)
    console.log(`   Filename: ${result.filename}`)
    console.log(`   Size: ${result.size} bytes`)
    console.log(`   Provider: ${result.provider}`)
    console.log(`   Proof Set ID: ${result.proofSetId}`)
    console.log(`   Download URL: ${result.downloadUrl}`)
    
    return result
    
  } catch (error) {
    console.error('❌ Upload example failed:', error.message)
    throw error
  }
}

/**
 * Example: Download content using a CID
 */
export async function downloadExample(cid) {
  try {
    console.log(`📥 Starting Filecoin download example for CID: ${cid}`)
    
    // Download the content
    const content = await downloadFromFilecoin(cid)
    
    console.log('✅ Download successful!')
    console.log('📄 Downloaded Content:')
    console.log(content)
    
    return content
    
  } catch (error) {
    console.error('❌ Download example failed:', error.message)
    throw error
  }
}

/**
 * Example: Check wallet balance
 */
export async function balanceExample() {
  try {
    console.log('💰 Checking wallet balance...')
    
    const balance = await checkWalletBalance()
    
    console.log('✅ Balance check successful!')
    console.log('📊 Balance Details:')
    console.log(`   Available Balance: ${balance.balance} USDFC`)
    console.log(`   Wallet Balance: ${balance.walletBalance} USDFC`)
    console.log(`   Current Epoch: ${balance.currentEpoch}`)
    console.log(`   Has Sufficient Balance: ${balance.hasBalance ? '✅ Yes' : '❌ No'}`)
    
    return balance
    
  } catch (error) {
    console.error('❌ Balance check failed:', error.message)
    throw error
  }
}

/**
 * Complete example: Upload, then download the same content
 */
export async function completeExample() {
  try {
    console.log('🔄 Starting complete Filecoin example...')
    
    // Step 1: Check balance
    await balanceExample()
    
    // Step 2: Upload content
    const uploadResult = await uploadExample()
    
    // Step 3: Download the same content
    const downloadedContent = await downloadExample(uploadResult.cid)
    
    // Step 4: Verify the content matches
    const originalContent = `🚀 Welcome to decentralized storage on Filecoin!
    
This is a test upload from the Kin3tic application.
Timestamp: ${new Date().toISOString()}
    
Your data is now stored securely on the Filecoin network! 🌍`
    
    const contentMatches = originalContent === downloadedContent
    console.log(`🔍 Content verification: ${contentMatches ? '✅ Match' : '❌ Mismatch'}`)
    
    return {
      uploadResult,
      downloadedContent,
      contentMatches
    }
    
  } catch (error) {
    console.error('❌ Complete example failed:', error.message)
    throw error
  }
}

// Example usage in a React component or other context:
/*
import { uploadExample, downloadExample, balanceExample, completeExample } from './examples/filecoinExample'

// In a React component:
const handleUpload = async () => {
  try {
    const result = await uploadExample()
    setUploadResult(result)
  } catch (error) {
    setError(error.message)
  }
}

// Or run the complete example:
const handleCompleteExample = async () => {
  try {
    const result = await completeExample()
    console.log('Complete example result:', result)
  } catch (error) {
    console.error('Complete example failed:', error)
  }
}
*/ 