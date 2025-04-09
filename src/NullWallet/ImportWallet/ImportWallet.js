import React, { useState } from 'react';
import axios from 'axios';
import style from './ImportWallet.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { saveSession } from '../../utils/sessionDB'; // add this

const ImportWallet = () => {
	const [unlockHash, setUnlockHash] = useState('');
	const [passphrase, setPassphrase] = useState('');
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const API_URL = process.env.REACT_APP_BACKEND_API;

	const handleVerify = async () => {
		try {
			const res = await axios.post(`${API_URL}/unlock-hash/verify`, {
				storedUnlockHash: unlockHash,
				passphrase: passphrase
			});

			if (res.data.verified) {
				setResult('✅ Verified');

				await saveSession({
					mainhash: unlockHash,
					expiresAt: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
				});

				console.log('Session saved with hash:', unlockHash);
			} else {
				setResult('❌ Invalid');
			}

			setError(null);
		} catch (err) {
			setResult(null);
			setError('Verification failed');
			console.error(err);
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

			<Button text="PROCEED" onClick={handleVerify} />

			{result && <span style={{ marginTop: '1rem', display: 'block' }}>{result}</span>}
			{error && <span style={{ color: 'red', marginTop: '1rem', display: 'block' }}>{error}</span>}
		</div>
	);
};

export default ImportWallet;
