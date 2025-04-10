import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './NullAsset.module.css';
import sendIcon from '../../assets/sendIcon.svg';
import recieveIcon from '../../assets/recieveIcon.svg';
import plusIcon from '../../assets/plusIcon.svg';
import TxnCard from '../../components/TxnCard/TxnCard';
import { UserContext } from '../../context/UserContext';
import AssetActionButton from '../../components/AssetActionButton/AssetActionButton';

import { Link } from 'react-router-dom';

const NullAsset = () => {
	const { assetSymbol } = useParams();
	const { user, mainHash, refetchUser } = useContext(UserContext);
	const [assetInfo, setAssetInfo] = useState(null);

	useEffect(() => {
		if (refetchUser) refetchUser(); // optional: you can await this if it returns a promise
	}, []);

	useEffect(() => {
		if (user?.UserMetaData?.UserAssetsAndBalances?.length > 0) {
			const foundAsset = user.UserMetaData.UserAssetsAndBalances.find(
				(asset) => asset.assetSymbol === assetSymbol
			);
			setAssetInfo(foundAsset || null);
		}
	}, [user, assetSymbol]);

	if (!user || !assetInfo) return <span>LOADING...</span>;

	return (
		<div className={style.NullWalletAsset}>
			<div>
				<span>NULL WALLET v0.1</span>
				<div>WELCOME BACK</div>
				<span>NULLNET ALPHA</span>
			</div>

			<div className={style.NullWalletAssetDetails}>
				<h2>{assetSymbol}</h2>
				<p>Asset Balance: {assetInfo.assetBalance?.toLocaleString() || '—'}</p>
				<p>Units Held: {assetInfo.unitsAmount?.toLocaleString(undefined, { maximumFractionDigits: 8 }) || '—'}</p>
				{assetInfo.assetPrice && (
					<p>Asset Price: ${assetInfo.assetPrice.toLocaleString()}</p>
				)}
			</div>

			<div className={style.NullWalletActions}>
				<Link to={`/NullWallet/SendAsset/${user._id}/${assetSymbol}`}>
					<AssetActionButton
						Icon={sendIcon}
						Action='SEND'
						assetSymbol={assetSymbol}
					/>
				</Link>

				{/* <Link to={`/NullWallet/SendAsset/${user._id}/${assetSymbol}`}> */}
				<AssetActionButton
					Icon={recieveIcon}
					Action='RECIEVE'
					assetSymbol={assetSymbol}
				/>
				{/* </Link> */}

				<Link to={`/NullWallet/BuyAsset/${user._id}/${assetSymbol}`}>
					<AssetActionButton
						Icon={plusIcon}
						Action='BUY'
						assetSymbol={assetSymbol}
					/>
				</Link>
			</div>

			<div>
				<p>TXN RECORD</p>
				<div className={style.NullWalletTxns}>
					<span>{mainHash}</span>

					{user.Transactions?.length > 0 ? (
						user.Transactions
							.filter((txn) => txn.assetSymbol === assetSymbol)
							.map((txn, index) => (
								<TxnCard
									key={index}
									transaction={txn}
								/>
							))
					) : (
						<p>No transactions yet.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default NullAsset;
