import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import style from './TxnCard.module.css';
import { truncateStringCustom } from '../../utils/truncateString';
import { dateParser } from '../../utils/dateParser';

const TxnCard = (props) => {
	console.log(props.transaction)
	const { user, mainHash, refetchUser } = useContext(UserContext);

	const isSender = mainHash && props?.transaction?.sender && mainHash === props.transaction.sender;


	return (
		<div className={style.TxnCardWrapper}>
			<span>{isSender ? 'SEND' : 'RECEIVE'}</span>
			<div className={style.TxnCardContent}>
				<span>{props.transaction.assetAmount} {props.transaction.assetSymbol}</span>
				<span>{props.transaction.totalValue} USD</span>
			</div>

			<div className={style.TxnCardContent}>
				<div className={style.TxnCardAddress}>
					<span>FROM:</span>
					<span>{truncateStringCustom(props.transaction.sender, 4, 4)}</span>
				</div>

				<div className={style.TxnCardAddress}>
					<span>TO:</span>
					<span>{truncateStringCustom(props.transaction.receiver, 5, 5)}</span>
				</div>
			</div>

			<div className={style.TxnCardContent}>
				<span>{props.transaction._id}</span>
				<span>{dateParser(props.transaction.timestamp)}</span>
			</div>
		</div>
	)
}

export default TxnCard