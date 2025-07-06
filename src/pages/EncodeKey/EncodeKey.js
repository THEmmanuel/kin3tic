import React, { useState } from 'react';
import axios from 'axios';
// import style from './KineticKeyHome.module.css';
import style from './EncodeKey.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Payments from '../../containers/Payments/Payments';
import { uploadStringToFilecoin } from '../../utils/fildCDNHelper';

const EncodeKey = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API;
	const [unlockHash, setUnlockHash] = useState('');
	const [keyValue, setKeyValue] = useState('');
	const [paymentModal, setPaymentModal] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [uploadResult, setUploadResult] = useState(null);
	const [uploadLoading, setUploadLoading] = useState(false);
	const [uploadError, setUploadError] = useState(null);
	const [uploadStatus, setUploadStatus] = useState('');

	// Function to check if keyValue is a valid number
	const isNumeric = (value) => /^\d+(\.\d+)?$/.test(value);

	const createKey = async () => {
		console.log('creating key');
		try {
			setError(null);
			setLoading(true);
			const response = await axios.post(`${API_URL}/kinetic-keys/create`, { data: keyValue, UH: unlockHash });
			setResult(response.data.voucherCode);
			// Clear any previous upload results when creating a new key
			setUploadResult(null);
			setUploadError(null);
			setUploadStatus('');
		} catch (error) {
			setError(error.response?.data?.error || "Failed to create key");
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = () => {
		if (result) {
			navigator.clipboard.writeText(result);
			alert("Key copied to clipboard!");
		}
	};

	const handleUploadToFilecoin = async () => {
		if (!result) {
			setUploadError('No kinetic key to upload');
			return;
		}

		try {
			setUploadLoading(true);
			setUploadError(null);
			setUploadStatus('Starting upload process...');
			
			// Create content with the encoded key and instructions
			const content = `KINETIC KEY STORAGE

This file contains a Kinetic Key that has been encoded and stored securely on the Filecoin network.

ENCODED KINETIC KEY:
${result}

To decode and view the content:
1. Visit: https://www.kin3tic.tech/decode-kinetic-key
2. Input the key unlock hash passphrase to decode and view the content

Generated: ${new Date().toISOString()}
Unlock Hash: ${unlockHash}

---
This kinetic key was generated using the Kin3tic application.
Store this file securely as it contains your encoded data.`;

			const uploadResult = await uploadStringToFilecoin(
				content, 
				`kinetic-key-${Date.now()}.txt`,
				(status) => setUploadStatus(status)
			);
			setUploadResult(uploadResult);
			setUploadStatus('Upload completed successfully!');
			console.log('Upload successful:', uploadResult);
		} catch (error) {
			setUploadError(error.message);
			setUploadStatus('Upload failed');
			console.error('Upload failed:', error);
		} finally {
			setUploadLoading(false);
		}
	};

	const copyDownloadLink = () => {
		if (uploadResult?.downloadUrl) {
			navigator.clipboard.writeText(uploadResult.downloadUrl);
			alert("Download link copied to clipboard!");
		}
	};

	const DecodeKey = () => {
		// if (isNumeric(keyValue)) {
		// 	setPaymentModal(true);
		// } else {
		// 	createKey();
		// }
		createKey();
	};

	return (
		<div>
			{!paymentModal ? (
				<div className={style.KineticKeyHome}>
					<div className={style.KineticKeyHomeWrapper}>
						<span className={style.KineticKeyHomeHeading}>KINETIC KEY</span>

						<span className={style.KineticKeyHomeDescription}>
							Kinetic Keys are unique, Zero Knowledge, cryptographic and mathematical unlock codes that provide private, string-based data storage.
						</span>
					</div>

					<div className={style.KineticKeyHomeFormWrapper}>
						<div className={style.KineticKeyHomeForm}>
							<Input
								label="KEY UNLOCK HASH"
								placeholder="ENTER KEY UNLOCK HASH"
								value={unlockHash}
								onChange={(e) => setUnlockHash(e.target.value)}
							/>

							<Input
								label="KEY VALUE"
								placeholder="ENTER THE VALUE TO BE STORED"
								value={keyValue}
								onChange={(e) => setKeyValue(e.target.value)}
							/>
						</div>

						{error && <span className={style.Error}>{error}</span>}
						{loading && <span className={style.Loading}>Loading...</span>}

						{result ? (
							<div className={style.ResultWrapper}>
								<div className={style.Results}>
									<span className={style.Result}>KEY:</span>
									<span className={style.ResultText}>{result}</span>
								</div>
								<div className={style.ButtonGroup}>
									<Button text="COPY" onClick={handleCopy} />
									<Button 
										text={uploadLoading ? "UPLOADING..." : "UPLOAD TO FILECOIN"} 
										onClick={handleUploadToFilecoin}
										disabled={uploadLoading}
									/>
								</div>

								{/* Upload Status */}
								{uploadLoading && uploadStatus && (
									<div className={style.UploadStatus}>
										<span>📤 {uploadStatus}</span>
									</div>
								)}

								{/* Filecoin Upload Results */}
								{uploadError && (
									<div className={style.UploadError}>
										<span>❌ Upload Error: {uploadError}</span>
									</div>
								)}

								{uploadResult && (
									<div className={style.UploadResult}>
										<h4>✅ Kinetic Key Uploaded to Filecoin!</h4>
										<div className={style.UploadDetails}>
											<p><strong>Download Link:</strong></p>
											<div className={style.DownloadLink}>
												<a 
													href={uploadResult.downloadUrl} 
													target="_blank" 
													rel="noopener noreferrer"
													className={style.DownloadUrl}
												>
													{uploadResult.downloadUrl}
												</a>
												<Button 
													text="COPY LINK" 
													onClick={copyDownloadLink}
													className={style.CopyButton}
												/>
											</div>
											<div className={style.DecodeInstructions}>
												<p><strong>To decode and view content:</strong></p>
												<p>Visit: <a href="https://www.kin3tic.tech/decode-kinetic-key" target="_blank" rel="noopener noreferrer">https://www.kin3tic.tech/decode-kinetic-key</a></p>
												<p>Input the key unlock hash passphrase to decode and view the content.</p>
											</div>
										</div>
									</div>
								)}
							</div>
						) : (
							<Button
								// text={isNumeric(keyValue) ? `PAY NGN ${keyValue}` : "CREATE KEY"}
								text="CREATE KEY"
								onClick={DecodeKey}
								disabled={loading}
							/>
						)}
					</div>
				</div>
			) : (
				<div>
					<Payments
						amount={keyValue}
						createKey={() => createKey()}
						unlockHash={unlockHash}
					/>
				</div>
			)}
		</div>
	);
};

export default EncodeKey;
