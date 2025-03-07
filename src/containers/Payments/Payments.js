import React, {useState} from 'react';
import style from './Payments.module.css'
import ActionButton from '../../components/ActionButton/ActionButton';
import PaystackLogo from '../../assets/paystackLogo.svg'
import FlutterwaveLogo from '../../assets/flwaveLogo.svg'
import MonnifyLogo from '../../assets/monnifyLogo.svg'
import QuickTellerLogo from '../../assets/quickTellerLogo.svg'


const Payments = (props) => {
	const processDemoPayment = (status) => {
		// Simulate payment processing
		setTimeout(() => {
			if (status === 'completed') {
				alert('Payment successful. Key creation completed')
			} else {
				alert('Payment failed. Please try again')
			}
		}, 3000)
	}

	return (
		<div className={style.PaymentsPage}>
			<div className={style.PaymentsTitle}>
				<span className={style.PaymentsTitle}>
					PAY THE AMOUNT BELOW TO COMPLETE YOUR KEY CREATION
				</span>

				<span className={style.PaymentAmount}>
					NGN {props.amount}
				</span>
			</div>

			<div className={style.ActionButtonWrappers}>
				<ActionButton
					icon={PaystackLogo}
					text="PAY WITH PAYSTACK"
					onClick={() => processDemoPayment('completed')}
				/>

				<ActionButton
					icon={FlutterwaveLogo}
					text="PAY WITH FLUTTERWAVE"
				/>

				<ActionButton
					icon={MonnifyLogo}
					text="PAY WITH MONNIFY"
				/>

				<ActionButton
					icon={QuickTellerLogo}
					text="PAY WITH QUICKTELLER"
				/>
			</div>
		</div>
	)
}

export default Payments;