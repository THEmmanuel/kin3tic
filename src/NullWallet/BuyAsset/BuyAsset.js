import React, { useContext, useEffect, useState } from 'react';
import style from './BuyAsset.module.css';
import { UserContext } from '../../context/UserContext';


import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { useParams } from 'react-router-dom';

const BuyAsset = (props) => {
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
						label={`${assetSymbol} AMOUNT TO BUY`}
					/>

					<Input
						label={`${assetSymbol} AMOUNT TO BUY`}
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

export default BuyAsset;