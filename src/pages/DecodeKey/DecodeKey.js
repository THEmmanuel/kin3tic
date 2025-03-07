import React from 'react';
import style from './DecodeKey.module.css'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button';

const DecodeKey = () => {
	return (
		<div>
			DECODE KEY

			<div className={style.DecodeKeyDataInput}>
				<Input
					label="KINETIC KEY"
					placeholder="ENTER KINETIC KEY"
				/>

				<Input
					label="KEY UNLOCK PHRASEPASSWORD"
					placeholder="ENTER KEY UNLOCK HASH"
				/>
			</div>

			<div className={style.DecodeKeyData}>
				<span className={style.DecodeKeyDetectionResult}>
					VALID KEY DETECTED
				</span>

				<span>
					IDENTIFIER: 1234567890
				</span>

				<span>
					UNLOCK HASH: 1234567890
				</span>

				<span>
					THIS KEY CONTAINS ENCODED DATA THAT MAKES YOU ELLIGIBLE FOR A PAYOUT OF:
				</span>

				<span>
					N10,000,000.00
				</span>
			</div>


			<Button
				text="DECODE KEY"
			/>
		</div>
	)
}

export default DecodeKey;