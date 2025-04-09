import React from 'react';
import style from './ImportWallet.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const ImportWallet = () => {
	return (
		<div>
			<div>
				<div>
					<Input
						label="UNLOCK HASH"
					/>

					<Input
						label="PASSPHRASE"
					/>
				</div>
			</div>

			<Button
				text="PROCEED"
			/>
			{/* 
			<div>
				<div>
					UNLOCK HASH
					<Button
						text="ENTER"
					/>
				</div>

				<span>
					USE YOUR UNLOCK HASH AND PASSPHRASE TO UNLOCK YOUR WALLET.

					PLEASE KEEP IT SAFE.
				</span>
			</div> */}
		</div>
	)
}

export default ImportWallet;