import React from 'react';
import style from './CreateNewWallet.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const CreateNewWalletPage = () => {
	return (
		<div>
			<div>
				<Input
					label="PASSPHRASE"
				/>

				<Input
					label="RE-ENTER PASSPHRASE"
				/>
			</div>

			<Button
				text="PROCEED"
			/>
		</div>
	)
}

export default CreateNewWalletPage;