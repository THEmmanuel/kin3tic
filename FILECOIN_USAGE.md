# Filecoin Storage Integration

This project includes a complete Filecoin storage integration using the Synapse SDK. You can upload strings to decentralized storage and get download links.

## Features

- ✅ Upload any string content to Filecoin
- ✅ Get downloadable links for uploaded content
- ✅ Download content using CIDs
- ✅ Check wallet balance and storage information
- ✅ Modern React UI with real-time feedback
- ✅ Error handling and loading states

## Quick Start

### 1. Environment Setup

Create a `.env` file in your project root with your Filecoin credentials:

```env
REACT_APP_PRIVATE_KEY=your_private_key_here
REACT_APP_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
```

**Note:** For testing, use the Calibration testnet. For production, use mainnet.

### 2. Basic Usage

```javascript
import { uploadStringToFilecoin } from './src/utils/fildCDNHelper'

// Upload a simple string
const result = await uploadStringToFilecoin('Hello, Filecoin!', 'greeting.txt')
console.log('Download URL:', result.downloadUrl)
console.log('CID:', result.cid)
```

### 3. Using the React Component

Import and use the `FilecoinUploader` component:

```javascript
import FilecoinUploader from './src/components/FilecoinUploader'

function App() {
  return (
    <div>
      <h1>My App</h1>
      <FilecoinUploader />
    </div>
  )
}
```

## API Reference

### `uploadStringToFilecoin(content, filename)`

Uploads a string to Filecoin storage.

**Parameters:**
- `content` (string): The text content to upload
- `filename` (string, optional): Filename for the download (default: 'data.txt')

**Returns:**
```javascript
{
  cid: string,           // Content Identifier
  downloadUrl: string,   // Direct download link
  filename: string,      // Filename
  size: number,          // Size in bytes
  provider: string,      // Storage provider address
  proofSetId: number     // Proof set ID
}
```

**Example:**
```javascript
const result = await uploadStringToFilecoin(
  '🚀 Welcome to decentralized storage on Filecoin!',
  'welcome.txt'
)

// Access the download link
console.log(result.downloadUrl)
// https://baga6ea4seaqao7s73y24kcutaosvacpdjgfe5pw76ooefnyqw4ynr3d2y6x2mpq.ipfs.dweb.link/welcome.txt
```

### `downloadFromFilecoin(cid)`

Downloads content from Filecoin using a CID.

**Parameters:**
- `cid` (string): The Content Identifier

**Returns:**
- `string`: The downloaded content

**Example:**
```javascript
const content = await downloadFromFilecoin('baga6ea4seaqao7s73y24kcutaosvacpdjgfe5pw76ooefnyqw4ynr3d2y6x2mpq')
console.log(content) // "🚀 Welcome to decentralized storage on Filecoin!"
```

### `checkWalletBalance()`

Checks the wallet's USDFC balance for storage operations.

**Returns:**
```javascript
{
  hasBalance: boolean,     // Whether there's sufficient balance
  balance: string,         // Available balance in USDFC
  walletBalance: string,   // Total wallet balance in USDFC
  currentEpoch: number     // Current Filecoin epoch
}
```

### `getStorageInfo()`

Gets information about the storage service.

**Returns:**
```javascript
{
  pricing: object,         // Storage pricing information
  providers: number,       // Number of available providers
  network: string,         // Network (mainnet/calibration)
  parameters: object       // Service parameters
}
```

## Payment Setup

Before uploading, you need to ensure your wallet has sufficient USDFC balance:

1. **Check Balance:** Use the `checkWalletBalance()` function
2. **Deposit Funds:** If needed, deposit USDFC to the payments contract
3. **Approve Service:** Approve the Pandora service for automated payments

The SDK handles most of this automatically, but you can also do it manually:

```javascript
import { Synapse, TOKENS, CONTRACT_ADDRESSES } from '@filoz/synapse-sdk'
import { ethers } from 'ethers'

const synapse = await Synapse.create({
  privateKey: 'your_private_key',
  rpcURL: 'https://api.calibration.node.glif.io/rpc/v1'
})

// Deposit USDFC (one-time setup)
const amount = ethers.parseUnits('100', 18) // 100 USDFC
await synapse.payments.deposit(amount, TOKENS.USDFC)

// Approve the Pandora service
const pandoraAddress = CONTRACT_ADDRESSES.PANDORA_SERVICE[synapse.getNetwork()]
await synapse.payments.approveService(
  pandoraAddress,
  ethers.parseUnits('10', 18),   // Rate allowance: 10 USDFC per epoch
  ethers.parseUnits('1000', 18)  // Lockup allowance: 1000 USDFC total
)
```

## Network Configuration

### Testnet (Calibration)
- RPC URL: `https://api.calibration.node.glif.io/rpc/v1`
- Use for testing and development
- Get test USDFC from faucets

### Mainnet
- RPC URL: `https://api.node.glif.io/rpc/v1`
- Use for production
- Requires real USDFC tokens

## Error Handling

The functions include comprehensive error handling:

```javascript
try {
  const result = await uploadStringToFilecoin('Hello World')
  console.log('Success:', result.downloadUrl)
} catch (error) {
  console.error('Upload failed:', error.message)
  // Common errors:
  // - "Allowance not sufficient" - Need more USDFC balance
  // - "Network error" - RPC connection issues
  // - "Storage provider unavailable" - Provider selection failed
}
```

## File Size Limits

- **Minimum:** 65 bytes
- **Maximum:** 200 MiB (209,715,200 bytes)

## Security Notes

- Never expose your private key in client-side code for production
- Use environment variables for sensitive configuration
- Consider using MetaMask or other wallet providers for better security
- The current implementation uses a hardcoded private key for demonstration

## Troubleshooting

### "Allowance not sufficient"
- Check your USDFC balance using `checkWalletBalance()`
- Deposit more USDFC to the payments contract
- Ensure service approvals are in place

### "Network error"
- Verify your RPC URL is correct
- Check your internet connection
- Try using a different RPC endpoint

### "Storage provider unavailable"
- The system will automatically retry with different providers
- Check if you're on the correct network (testnet vs mainnet)

## Example Use Cases

1. **Document Storage:** Upload important documents with permanent links
2. **Data Backup:** Store critical data on decentralized storage
3. **Content Sharing:** Share content with permanent, censorship-resistant URLs
4. **App Configuration:** Store app settings and configurations
5. **User Data:** Store user-generated content securely

## Links

- [Synapse SDK Documentation](https://docs.filoz.com)
- [Filecoin Documentation](https://docs.filecoin.io)
- [Calibration Testnet Faucet](https://faucet.calibration.fildev.network) 