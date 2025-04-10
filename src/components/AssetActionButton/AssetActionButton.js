import React from 'react';
import style from './AssetActionButton.module.css';

const AssetActionButton = (props) => {
	return (
		<div className={style.NullWalletActionButton}>
			<img
				src={props.Icon}
				alt=""
				className={style.NullWalletActionImage}
			/>

			<span className={style.NullWalletActionText}>
				{props.Action} {props.assetSymbol}
			</span>
		</div>
	)
}

export default AssetActionButton;