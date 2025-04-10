import React, { useContext, useEffect, useState } from 'react';
import style from './BuyAsset.module.css';
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BuyAsset = () => {
	const { assetSymbol } = useParams();
	const { mainHash, user, refetchUser } = useContext(UserContext);

	const API_URL = process.env.REACT_APP_BACKEND_API;

	const [amountUSD, setAmountUSD] = useState('');
	const [assetUnits, setAssetUnits] = useState('');
	const [pin, setPin] = useState('');
	const [status, setStatus] = useState('');
	const [assetPrice, setAssetPrice] = useState(null);
	const [txData, setTxData] = useState(null);

	useEffect(() => {
		const fetchPrice = async () => {
			try {
				const res = await axios.get(`${API_URL}/assetx/get-asset-price/${assetSymbol}`);
				setAssetPrice(res.data.price);
			} catch (err) {
				setStatus('Error fetching asset price');
				console.error(err);
			}
		};

		fetchPrice();
	}, [assetSymbol, API_URL]);

	useEffect(() => {
		if (assetPrice && amountUSD !== '') {
			const units = parseFloat(amountUSD) / assetPrice;
			setAssetUnits(units ? units.toFixed(4) : '');
		}
	}, [amountUSD, assetPrice]);

	useEffect(() => {
		if (assetPrice && assetUnits !== '') {
			const usd = parseFloat(assetUnits) * assetPrice;
			setAmountUSD(usd ? usd.toFixed(2) : '');
		}
	}, [assetUnits, assetPrice]);

	const handleBuy = async () => {
		if (!mainHash || !amountUSD || !pin) {
			setStatus('Please fill in all required fields');
			return;
		}

		try {
			setStatus('BUYING...');
			const res = await axios.post(`${API_URL}/assetx/buy-asset`, {
				AssetToBuy: assetSymbol,
				Amount: parseFloat(amountUSD),
				PIN: pin,
				SenderHash: 'NullWallet',
				ReceiverHash: mainHash,
				UserID: user._id
			});

			if (res.data.success) {
				setStatus('✅ PURCHASE COMPLETE');
				setTxData(res.data.transaction);
				refetchUser?.();
			} else {
				setStatus('❌ FAILED: ' + res.data.error);
			}
		} catch (err) {
			setStatus(err.response?.data?.error || 'Request failed');
			console.error(err);
		}
	};

	return (
		<div className={style.BuyAsset}>
			<div>
				<span>NULL WALLET v0.1</span>
				<div>WELCOME BACK</div>
				<span>NULLNET ALPHA</span>
			</div>

			<div>
				<h2>BUY {assetSymbol}</h2>

				<div className={style.BuyAssetInput}>
					<Input
						label={`${assetSymbol} AMOUNT`}
						value={assetUnits}
						onChange={(e) => setAssetUnits(e.target.value)}
					/>

					<Input
						label="USD AMOUNT"
						value={amountUSD}
						onChange={(e) => setAmountUSD(e.target.value)}
					/>

					<Input
						label="PIN"
						type="password"
						value={pin}
						onChange={(e) => setPin(e.target.value)}
					/>
				</div>

				{assetPrice && (
					<div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
						<p><strong>Asset Price:</strong> ${assetPrice}</p>
						<p><strong>Buying Units:</strong> {assetUnits || '0'} {assetSymbol}</p>
						<p><strong>Total Cost:</strong> ${amountUSD || '0.00'}</p>
						<p><strong>Sender:</strong> NullWallet</p>
						<p><strong>Receiver (You):</strong> {mainHash}</p>
					</div>
				)}

				<Button text="PROCEED" onClick={handleBuy} />
				{status && <p style={{ marginTop: '1rem' }}>{status}</p>}
			</div>

			{txData && (
				<div style={{ marginTop: '2rem', fontSize: '0.85rem' }}>
					<h4>Transaction Details</h4>
					<p><strong>ID:</strong> {txData._id}</p>
					<p><strong>Timestamp:</strong> {new Date(txData.createdAt).toLocaleString()}</p>
					<p><strong>Sender:</strong> {txData.sender}</p>
					<p><strong>Receiver:</strong> {txData.receiver}</p>
					<p><strong>Asset:</strong> {txData.assetSymbol}</p>
					<p><strong>Units:</strong> {txData.assetAmount}</p>
					<p><strong>Price per unit:</strong> ${txData.assetPrice}</p>
					<p><strong>Total USD:</strong> ${txData.totalValue}</p>
				</div>
			)}
		</div>
	);
};

export default BuyAsset;
