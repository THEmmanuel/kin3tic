import React, { useState } from 'react';
import axios from 'axios';
import style from './KineticKeyHome.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Payments from '../../containers/Payments/Payments';

const KineticKeyHome = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API;
	const [unlockHash, setUnlockHash] = useState('');
	const [keyValue, setKeyValue] = useState('');
	const [paymentModal, setPaymentModal] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	// Function to check if keyValue is a valid number
	const isNumeric = (value) => /^\d+(\.\d+)?$/.test(value);

	const createKey = async () => {
		console.log('duhdjsdjsdjsds sjhds ')
		try {
			setError(null);
			const response = await axios.post(`${API_URL}/kinetic-keys/create`, { data: keyValue, UH: unlockHash });
			setResult(response.data.voucherCode);
		} catch (error) {
			setError(error.response?.data?.error || "Failed to create key");
		}
	};

	const handleCopy = () => {
		if (result) {
			navigator.clipboard.writeText(result);
			alert("Key copied to clipboard!");
		}
	};

	const DecodeKey = () => {
		if (isNumeric(keyValue)) {
			setPaymentModal(true);
		} else {
			createKey();
		}
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

						{result ? (
							<div className={style.ResultWrapper}>
								<div className={style.Results}>
									<span className={style.Result}>
										KEY:
									</span>

									<span className={style.ResultText}>
										{result}
									</span>
								</div>
								<Button text="COPY" onClick={handleCopy} />
							</div>
						) : (
							<Button
								text={isNumeric(keyValue) ? `PAY NGN ${keyValue}` : "CREATE KEY"}
								onClick={DecodeKey}
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

export default KineticKeyHome;
