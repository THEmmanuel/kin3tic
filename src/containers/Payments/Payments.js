import React, { useState } from 'react';
import axios from 'axios';
import style from './Payments.module.css';
import ActionButton from '../../components/ActionButton/ActionButton';
import PaystackLogo from '../../assets/paystackLogo.svg';
import FlutterwaveLogo from '../../assets/flwaveLogo.svg';
import MonnifyLogo from '../../assets/monnifyLogo.svg';
import QuickTellerLogo from '../../assets/quickTellerLogo.svg';

const API_URL = process.env.REACT_APP_BACKEND_API;

const Payments = ({ amount, unlockHash }) => {
	const [keyResult, setKeyResult] = useState(null);
	const [paymentCompleted, setPaymentCompleted] = useState(false);
	const [error, setError] = useState(null);

	const handlePayment = async () => {
		try {
			setError(null);
			const response = await axios.post(`${API_URL}/kinetic-keys/create`, {
				data: amount.toString(),
				UH: unlockHash
			});
			setKeyResult(response.data.voucherCode);
			setPaymentCompleted(true);
		} catch (error) {
			setError(error.response?.data?.error || "Failed to create key");
		}
	};

	const handleCopy = () => {
		if (keyResult) {
			navigator.clipboard.writeText(keyResult);
			alert('Key copied to clipboard!');
		}
	};

	return (
		<div className={style.PaymentsPage}>
			{paymentCompleted ? (
				<div>
					<span className={style.SuccessMessage}>
						You have successfully paid the amount specified.
					</span>
					<span className={style.KeyResult}>Key: {keyResult}</span>
					<ActionButton text="Copy" onClick={handleCopy} />
					<ActionButton text="Home" onClick={() => window.location.reload()} />
				</div>
			) : (
				<div>
					<div className={style.PaymentsTitle}>
						<span className={style.PaymentsTitle}>
							PAY THE AMOUNT BELOW TO COMPLETE YOUR KEY CREATION
						</span>
						<span className={style.PaymentAmount}>NGN {amount}</span>
					</div>

					<div className={style.ActionButtonWrappers}>
						<ActionButton icon={PaystackLogo} text="PAY WITH PAYSTACK" onClick={handlePayment} />
						<ActionButton icon={FlutterwaveLogo} text="PAY WITH FLUTTERWAVE" onClick={handlePayment} />
						<ActionButton icon={MonnifyLogo} text="PAY WITH MONNIFY" onClick={handlePayment} />
						<ActionButton icon={QuickTellerLogo} text="PAY WITH QUICKTELLER" onClick={handlePayment} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Payments;
