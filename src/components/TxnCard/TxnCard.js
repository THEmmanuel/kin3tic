import React from 'react';
import style from './TxnCard.module.css';
import { truncateStringCustom } from '../../utils/truncateString';

const TxnCard = (props) => {
	console.log(props.transaction)

	return (
		<div className={style.TxnCardWrapper}>
			<span>RECIEVE</span>
			<span>{props.transaction.assetAmount} {props.transaction.assetSymbol}</span>
			<span>{props.transaction.totalValue} USD</span>
			<span>{truncateStringCustom(props.transaction.sender, 4, 4)}</span>
			<span>{truncateStringCustom(props.transaction.receiver, 5, 5)}</span>
			<span>{props.transaction._id}</span>
			<span>{props.transaction.timestamp}</span>
		</div>
	)
}

export default TxnCard