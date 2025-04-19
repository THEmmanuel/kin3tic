import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './CreateNewWallet.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { saveSession } from '../../utils/sessionDB';

const CreateNewWalletPage = () => {
	const [passphrase, setPassphrase] = useState('');
	const [confirmPassphrase, setConfirmPassphrase] = useState('');
	const [unlockHash, setUnlockHash] = useState('');
	const [status, setStatus] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);
	const API_URL = process.env.REACT_APP_BACKEND_API;
	const navigate = useNavigate();

	const handleCreateWallet = async () => {
		if (passphrase !== confirmPassphrase) {
			setError('❗ Passphrases do not match.');
			return;
		}
		setError(null);
		setLoading(true);
		setStatus('🔐 Generating your wallet...');

		try {
			const res = await axios.post(`${API_URL}/users`, {
				passphrase,
			});

			const hash = res.data.MainHash;
			setUnlockHash(hash);
			setStatus('✅ Wallet created successfully.');

			await saveSession({
				mainhash: hash,
				expiresAt: Date.now() + 2 * 60 * 60 * 1000
			});

			console.log('Session saved with hash:', hash);

			setTimeout(() => {
				navigate('/nullwallet/home');
			}, 1500);
		} catch (err) {
			console.error(err);
			setError('❗ Wallet creation failed. Please try again.');
			setStatus('');
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = () => {
		if (unlockHash) {
			navigator.clipboard.writeText(unlockHash);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className={style.CreateNewWallet}>
			<div className={style.InputSection}>
				<Input
					label="PASSPHRASE"
					value={passphrase}
					onChange={(e) => setPassphrase(e.target.value)}
				/>
				<Input
					label="RE-ENTER PASSPHRASE"
					value={confirmPassphrase}
					onChange={(e) => setConfirmPassphrase(e.target.value)}
				/>

				<Input
					label="PIN"
					value={confirmPassphrase}
					onChange={(e) => setConfirmPassphrase(e.target.value)}
				/>

				<Input
					label="PIN"
					value={confirmPassphrase}
					onChange={(e) => setConfirmPassphrase(e.target.value)}
				/>
			</div>

			<Button
				text="PROCEED"
				onClick={handleCreateWallet}
				disabled={loading}
			/>

			{unlockHash && (
				<div className={style.HashBox}>
					<div className={style.HashRow}>
						<span>UNLOCK HASH</span>
						<Button text={copied ? "COPIED" : "COPY"} onClick={handleCopy} />
					</div>
					<code className={style.HashValue}>{unlockHash}</code>
					<p className={style.Warning}>
						USE YOUR UNLOCK HASH AND PASSPHRASE TO UNLOCK YOUR WALLET.
						<br />
						<b>PLEASE KEEP IT SAFE.</b>
					</p>
				</div>
			)}

			{status && <span style={{ marginTop: '1rem', display: 'block' }}>{status}</span>}
			{error && <span style={{ color: 'red', marginTop: '1rem', display: 'block' }}>{error}</span>}
		</div>
	);
};

export default CreateNewWalletPage;
