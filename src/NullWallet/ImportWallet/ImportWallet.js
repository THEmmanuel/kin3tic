import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './ImportWallet.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { saveSession } from '../../utils/sessionDB';

const ImportWallet = () => {
	const [unlockHash, setUnlockHash] = useState('');
	const [passphrase, setPassphrase] = useState('');
	const [status, setStatus] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const API_URL = process.env.REACT_APP_BACKEND_API;
	const navigate = useNavigate();

	const handleVerify = async () => {
		setLoading(true);
		setStatus('🔐 VERIFYING...');
		setError(null);
		try {
			const res = await axios.post(`${API_URL}/unlock-hash/verify`, {
				storedUnlockHash: unlockHash,
				passphrase: passphrase
			});

			if (res.data.verified) {
				setStatus('✅ SUCCESSFUL... Opening your wallet.');

				await saveSession({
					mainhash: unlockHash,
					expiresAt: Date.now() + 2 * 60 * 60 * 1000
				});

				console.log('Session saved with hash:', unlockHash);

				setTimeout(() => {
					navigate('/nullwallet/home');
				}, 1500); // Give user a moment to read success message
			} else {
				setStatus('❌ Invalid hash or passphrase');
			}
		} catch (err) {
			console.error(err);
			setError('❗ Verification failed. Please try again.');
			setStatus('');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={style.ImportWallet}>
			<div>
				<Input
					label="UNLOCK HASH"
					value={unlockHash}
					onChange={(e) => setUnlockHash(e.target.value)}
				/>
				<Input
					label="PASSPHRASE"
					value={passphrase}
					onChange={(e) => setPassphrase(e.target.value)}
				/>
			</div>

			<Button text="PROCEED" onClick={handleVerify} disabled={loading} />

			{status && <span style={{ marginTop: '1rem', display: 'block' }}>{status}</span>}
			{error && <span style={{ color: 'red', marginTop: '1rem', display: 'block' }}>{error}</span>}
		</div>
	);
};

export default ImportWallet;
