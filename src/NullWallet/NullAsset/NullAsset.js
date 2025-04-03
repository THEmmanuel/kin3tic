import React from 'react';
import style from './NullAsset.module.css';
import sendIcon from '../../assets/sendIcon.svg';
import recieveIcon from '../../assets/recieveIcon.svg';
import plusIcon from '../../assets/plusIcon.svg';
import TxnCard from '../../components/TxnCard/TxnCard';

const NullAsset = () => {
	return (
		<div className={style.NullWalletAsset}>
			<div>
				<span>
					NULL WALLET v0.1
				</span>

				<div>
					WELCOME BACK
				</div>

				NULLNET ALPHA
			</div>

			<div className={style.NullWalletActions}>
				<div className={style.NullWalletActionButton}>
					<img
						src={sendIcon}
						alt=""
						className={style.NullWalletActionImage}
					/>
					<span>SEND USDX</span>
				</div>

				<div className={style.NullWalletActionButton}>
					<img
						src={recieveIcon}
						alt=""
						className={style.NullWalletActionImage}
					/>
					<span>RECIEVE USDX</span>
				</div>

				<div className={style.NullWalletActionButton}>
					<img
						src={plusIcon}
						alt=""
						className={style.NullWalletActionImage}
					/>

					<span>PLUS USDX</span>
				</div>
			</div>

			<div>
				TXN RECORD

				<div className={style.NullWalletTxns}>
					<TxnCard />
					<TxnCard />
					<TxnCard />
					<TxnCard />
					<TxnCard />
					<TxnCard />
				</div>
			</div>
		</div>
	)
}

export default NullAsset;