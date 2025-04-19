import React from 'react';
import style from './AssetCard.module.css'

const AssetCard = (props) => {
	return (
		<div className={style.AssetCardWrapper}>
			<div className={style.AssetCardContent}>
				<span>{props.asset}</span>
				<span>{props.assetAmount ? Number(props.assetAmount).toFixed(3) : '0.000'} {props.assetName}</span>
			</div>

			<div className={style.AssetCardContent}>
				<span>{props.assetValue ? Number(props.assetValue).toFixed(3) : '0.000'} {props.currency}</span>
				<span>{props.assetUnitValue}</span>
			</div>
		</div>
	)
}
export default AssetCard;