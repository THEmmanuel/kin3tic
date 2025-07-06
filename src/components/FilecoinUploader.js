import React, { useState } from 'react'
import { uploadStringToFilecoin, downloadFromFilecoin, checkWalletBalance, getStorageInfo } from '../utils/fildCDNHelper'
import './FilecoinUploader.module.css'

const FilecoinUploader = () => {
  const [content, setContent] = useState('')
  const [filename, setFilename] = useState('data.txt')
  const [uploadResult, setUploadResult] = useState(null)
  const [downloadContent, setDownloadContent] = useState('')
  const [cid, setCid] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [balance, setBalance] = useState(null)
  const [storageInfo, setStorageInfo] = useState(null)

  const handleUpload = async () => {
    if (!content.trim()) {
      setError('Please enter some content to upload')
      return
    }

    setLoading(true)
    setError('')
    setUploadResult(null)

    try {
      const result = await uploadStringToFilecoin(content, filename)
      setUploadResult(result)
      console.log('Upload successful:', result)
    } catch (err) {
      setError(err.message)
      console.error('Upload failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!cid.trim()) {
      setError('Please enter a CID to download')
      return
    }

    setLoading(true)
    setError('')
    setDownloadContent('')

    try {
      const content = await downloadFromFilecoin(cid)
      setDownloadContent(content)
      console.log('Download successful:', content)
    } catch (err) {
      setError(err.message)
      console.error('Download failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkBalance = async () => {
    setLoading(true)
    setError('')

    try {
      const balanceInfo = await checkWalletBalance()
      setBalance(balanceInfo)
      console.log('Balance info:', balanceInfo)
    } catch (err) {
      setError(err.message)
      console.error('Balance check failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const getInfo = async () => {
    setLoading(true)
    setError('')

    try {
      const info = await getStorageInfo()
      setStorageInfo(info)
      console.log('Storage info:', info)
    } catch (err) {
      setError(err.message)
      console.error('Storage info fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="filecoin-uploader">
      <h2>🚀 Filecoin Storage Demo</h2>
      
      {/* Balance Check */}
      <div className="section">
        <h3>💰 Wallet Balance</h3>
        <button onClick={checkBalance} disabled={loading}>
          {loading ? 'Checking...' : 'Check Balance'}
        </button>
        {balance && (
          <div className="balance-info">
            <p><strong>Available Balance:</strong> {balance.balance} USDFC</p>
            <p><strong>Wallet Balance:</strong> {balance.walletBalance} USDFC</p>
            <p><strong>Current Epoch:</strong> {balance.currentEpoch}</p>
            <p><strong>Has Balance:</strong> {balance.hasBalance ? '✅ Yes' : '❌ No'}</p>
          </div>
        )}
      </div>

      {/* Storage Info */}
      <div className="section">
        <h3>📊 Storage Information</h3>
        <button onClick={getInfo} disabled={loading}>
          {loading ? 'Loading...' : 'Get Storage Info'}
        </button>
        {storageInfo && (
          <div className="storage-info">
            <p><strong>Network:</strong> {storageInfo.network}</p>
            <p><strong>Available Providers:</strong> {storageInfo.providers}</p>
            <p><strong>Price per TiB/month:</strong> {storageInfo.pricing?.noCDN?.perTiBPerMonth || 'N/A'} USDFC</p>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div className="section">
        <h3>📤 Upload to Filecoin</h3>
        <div className="input-group">
          <label>Content to upload:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your text content here..."
            rows={4}
          />
        </div>
        <div className="input-group">
          <label>Filename:</label>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="data.txt"
          />
        </div>
        <button onClick={handleUpload} disabled={loading || !content.trim()}>
          {loading ? 'Uploading...' : 'Upload to Filecoin'}
        </button>

        {uploadResult && (
          <div className="upload-result">
            <h4>✅ Upload Successful!</h4>
            <p><strong>CID:</strong> {uploadResult.cid}</p>
            <p><strong>Filename:</strong> {uploadResult.filename}</p>
            <p><strong>Size:</strong> {uploadResult.size} bytes</p>
            <p><strong>Provider:</strong> {uploadResult.provider}</p>
            <p><strong>Proof Set ID:</strong> {uploadResult.proofSetId}</p>
            <p><strong>Download URL:</strong></p>
            <div className="download-url">
              <a href={uploadResult.downloadUrl} target="_blank" rel="noopener noreferrer">
                {uploadResult.downloadUrl}
              </a>
              <button onClick={() => copyToClipboard(uploadResult.downloadUrl)}>
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Download Section */}
      <div className="section">
        <h3>📥 Download from Filecoin</h3>
        <div className="input-group">
          <label>CID to download:</label>
          <input
            type="text"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            placeholder="Enter CID here..."
          />
        </div>
        <button onClick={handleDownload} disabled={loading || !cid.trim()}>
          {loading ? 'Downloading...' : 'Download from Filecoin'}
        </button>

        {downloadContent && (
          <div className="download-result">
            <h4>✅ Download Successful!</h4>
            <p><strong>Content:</strong></p>
            <textarea
              value={downloadContent}
              readOnly
              rows={4}
            />
            <button onClick={() => copyToClipboard(downloadContent)}>
              Copy Content
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="error">
          <h4>❌ Error</h4>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default FilecoinUploader 