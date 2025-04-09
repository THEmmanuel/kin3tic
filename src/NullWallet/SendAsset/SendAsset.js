import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import style from './SendAsset.module.css'

const SendAsset = () => {
	const { assetSymbol } = useParams();
	const { user, mainHash, refetchUser } = useContext(UserContext);

	return (
		<div>
			<div>
				<span>NULL WALLET v0.1</span>
				<div>WELCOME BACK</div>
				<span>NULLNET ALPHA</span>
			</div>

			<div>
				SEND {assetSymbol}
				<div>
					<Input
						label={`${assetSymbol} AMOUNT TO SEND`}
					/>

					<Input
						label={`${assetSymbol} AMOUNT TO SEND`}
					/>

					<Input
						label={`RECIEVING HASH`}
					/>
				</div>
			</div>

			<Button
				text="PROCEED"
			/>
		</div>
	)
}

export default SendAsset;