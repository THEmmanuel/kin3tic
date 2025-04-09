import React from 'react';
import style from './AssetCard.module.css'

const AssetCard = (props) => {
	return (
		<div className={style.AssetCardWrapper}>
			<span>{props.asset}</span>
			<span>{props.assetAmount} {props.assetName}</span>
			<span>{props.assetValue} {props.currency}</span>
			<span>{props.assetUnitValue}</span>
		</div>
	)
}
export default AssetCard;