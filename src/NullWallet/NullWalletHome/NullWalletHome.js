import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import style from './NullWalletHome.module.css';
import AssetCard from '../../components/AssetCard/AssetCard';
import Button from '../../components/Button/Button';
import dropdown from '../../assets/dropdown.svg';
import { UserContext } from '../../context/UserContext';
import { getSession } from '../../utils/sessionDB'; // Ensure this is implemented

const NullWalletHome = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API;
	const [assets, setAssets] = useState([]);
	const [userAssets, setUserAssets] = useState([]);
	const [isAssetsLoading, setIsAssetsLoading] = useState(true);
	const [isUserLoading, setIsUserLoading] = useState(true);
	const [totalValue, setTotalValue] = useState(0);

	const { user, mainHash } = useContext(UserContext);
	const navigate = useNavigate();

	// 🔍 Check for session immediately
	useEffect(() => {
		const verifySession = async () => {
			const session = await getSession();
			if (!session?.mainhash) {
				navigate('/nullwallet/start');
			}
		};
		verifySession();
	}, [navigate]);

	// 📦 Fetch available asset types
	useEffect(() => {
		const fetchAssetList = async () => {
			try {
				setIsAssetsLoading(true);
				const response = await axios.get(`${API_URL}/assetx`);
				setAssets(response.data);
			} catch (error) {
				console.error('Error fetching assets:', error);
			} finally {
				setIsAssetsLoading(false);
			}
		};

		fetchAssetList();
	}, [API_URL]);

	// 🔄 Merge user assets with market data
	useEffect(() => {
		if (!isAssetsLoading && user) {
			setIsUserLoading(true);

			const userAssetList = user.UserMetaData?.UserAssetsAndBalances || [];

			const merged = userAssetList.map(userAsset => {
				const assetInfo = assets.find(a => a.assetSymbol === userAsset.assetSymbol);
				const unitPrice = assetInfo?.assetPrice || userAsset.assetPrice || 0;
				const assetName = assetInfo?.assetName || userAsset.assetSymbol;
				const assetValue = userAsset.unitsAmount * unitPrice;

				return {
					...userAsset,
					assetName,
					assetUnitValue: unitPrice,
					assetValue,
				};
			});

			const filtered = merged.filter(a => a.unitsAmount > 0);
			setUserAssets(filtered);

			const total = filtered.reduce((acc, asset) => acc + asset.assetValue, 0);
			setTotalValue(total);

			setIsUserLoading(false);
		}
	}, [user, assets, isAssetsLoading]);


	return (
		<div className={style.NullWalletHome}>
			<div className={style.NullWalletHomeHeader}>
				<span className='MainHeading'>NULL WALLET v0.1</span>

				<div className={style.NullWalletHomeHeaderSub}>
					<span>WELCOME BACK</span>
					<span>mainHash: {mainHash || '...'}</span>

					<div className={style.NullWalletChain}>
						<span className={style.NullWalletChainName}>NULLNET ALPHA</span>
						<img src={dropdown} alt="dropdown" />
					</div>
				</div>
			</div>

			<div className={style.NullWalletHomeBalance}>
				<span>WALLET VALUE</span>
				<span className='SubHeading'>
					{isUserLoading
						? 'Loading...'
						: totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
				</span>
			</div>

			<div className={style.NullWalletHomeAssets}>
				{isAssetsLoading || isUserLoading ? (
					<div className={style.Loader}>
						<span>Loading assets...</span>
					</div>
				) : userAssets.length > 0 ? (
					userAssets.map((asset, index) => (
						<Link to={`/NullWallet/Asset/${user._id}/${asset.assetSymbol}`} key={index}>
							<AssetCard
								asset={asset.assetName}
								assetAmount={asset.unitsAmount}
								assetName={asset.assetSymbol}
								assetValue={asset.assetValue}
								currency='USD'
								assetUnitValue={asset.assetUnitValue}
							/>
						</Link>
					))
				) : (
					<div className={style.Loader}>
						<span>Your wallet is ready but has no assets yet.</span>
						<span>Share your mainHash to start receiving assets.</span>
					</div>
				)}

			</div>

			<div className={style.NullWalletHomeButtons}>
				<Link to={`/NullWallet/Import`}>
					<Button text='IMPORT NEW' />
				</Link>

				<Link to={`/NullWallet/Create`}>
					<Button text='CREATE NEW' />
				</Link>
			</div>
		</div>
	);
};

export default NullWalletHome;
