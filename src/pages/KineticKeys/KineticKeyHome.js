import React, { useState } from 'react';
import style from './KineticKeyHome.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Payments from '../../containers/Payments/Payments';

const KineticKeyHome = () => {
	const [unlockHash, setUnlockHash] = useState('');
	const [keyValue, setKeyValue] = useState('');
	const [paymentModal, setPaymentModal] = useState(false);

	// Function to check if keyValue is a valid number
	const isNumeric = (value) => /^\d+(\.\d+)?$/.test(value);


	const DecodeKey = () => {
		isNumeric(keyValue) ? setPaymentModal(true) : alert('Will create key');
		console.log('decode key');
	}

	return (
		<div>
			{
				!paymentModal ?
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

							<Button
								text={isNumeric(keyValue) ? `PAY NGN ${keyValue}` : "CREATE KEY"}
								onClick={() => DecodeKey()}
							/>
						</div>
					</div>

					:
					<div>
						<Payments 
							amount={keyValue}
						/>
					</div>
			}
		</div>
	);
};

export default KineticKeyHome;

