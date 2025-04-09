import React from 'react';
import style from './CreateNewWallet.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const CreateNewWalletPage = () => {
	return (
		<div>
			<div>
				<div>
					<Input
						label="PASSPHRASE"
					/>

					<Input
						label="RE-ENTER PASSPHRASE"
					/>
				</div>
			</div>

			<Button
				text="PROCEED"
			/>

			<div>
				<div>
					UNLOCK HASH
					<Button
						text="COPY"
					/>
				</div>

				<span>
					USE YOUR UNLOCK HASH AND PASSPHRASE TO UNLOCK YOUR WALLET.

					PLEASE KEEP IT SAFE.
				</span>
			</div>
		</div>
	)
}

export default CreateNewWalletPage;