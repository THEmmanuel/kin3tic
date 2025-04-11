import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { dateParser } from '../../utils/dateParser';


import style from './SendAsset.module.css';

const SendAsset = () => {
	const { assetSymbol } = useParams();
	const { user, mainHash, refetchUser } = useContext(UserContext);

	const API_URL = process.env.REACT_APP_BACKEND_API;

	const [amountUSD, setAmountUSD] = useState('');
	const [assetUnits, setAssetUnits] = useState('');
	const [receiverHash, setReceiverHash] = useState('');
	const [pin, setPin] = useState('');
	const [status, setStatus] = useState('');
	const [assetPrice, setAssetPrice] = useState(null);
	const [txResult, setTxResult] = useState(null);
	const [lastChanged, setLastChanged] = useState(null);

	// Fetch current price of asset
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

	// Sync assetUnits or amountUSD based on what user edited last
	useEffect(() => {
		if (!assetPrice) return;

		if (lastChanged === 'usd' && amountUSD !== '') {
			const units = parseFloat(amountUSD) / assetPrice;
			if (!isNaN(units)) setAssetUnits(units.toFixed(4));
		}

		if (lastChanged === 'units' && assetUnits !== '') {
			const usd = parseFloat(assetUnits) * assetPrice;
			if (!isNaN(usd)) setAmountUSD(usd.toFixed(2));
		}
	}, [amountUSD, assetUnits, assetPrice, lastChanged]);

	// Handle Send Action
	const handleSend = async () => {
		if (!mainHash || !amountUSD || !pin || !receiverHash) {
			setStatus('Please fill in all fields');
			return;
		}

		try {
			setStatus('SENDING...');
			setTxResult(null);

			const res = await axios.post(`${API_URL}/assetx/send-asset`, {
				Amount: parseFloat(amountUSD),
				PIN: pin,
				SenderHash: mainHash,
				ReceiverHash: receiverHash,
				AssetSymbol: assetSymbol
			});

			setStatus(res.data.success ? '✅ SENT' : '❌ FAILED');

			if (res.data.success) {
				refetchUser?.();
				setTxResult(res.data.transaction);
			}
		} catch (err) {
			setStatus(err.response?.data?.error || 'Request failed');
			console.error(err);
		}
	};

	// Get user balance for this asset
	const userBalance = user?.UserMetaData?.UserAssetsAndBalances?.find(
		(a) => a.assetSymbol.toLowerCase() === assetSymbol.toLowerCase()
	);
	const displayBalance = userBalance
		? `${userBalance.unitsAmount.toFixed(4)} ${assetSymbol}`
		: `0.0000 ${assetSymbol}`;

	return (
		<div className={style.SendAsset}>
			<div>
				<span>NULL WALLET v0.1</span>
				<div>WELCOME BACK</div>
				<span>NULLNET ALPHA</span>
			</div>

			<div>
				<h2>SEND {assetSymbol}</h2>
				<div className={style.SendAssetInput}>
					<Input
						label={`${assetSymbol} AMOUNT`}
						value={assetUnits}
						onChange={(e) => {
							setAssetUnits(e.target.value);
							setLastChanged('units');
						}}
					/>
					<p style={{ fontSize: '0.9rem', color: '#777', marginTop: '-0.5rem' }}>
						Balance: {displayBalance}
					</p>

					<Input
						label="USD VALUE"
						value={amountUSD}
						onChange={(e) => {
							setAmountUSD(e.target.value);
							setLastChanged('usd');
						}}
					/>

					<Input
						label="RECEIVING HASH"
						value={receiverHash}
						onChange={(e) => setReceiverHash(e.target.value)}
					/>

					<Input
						label="PIN"
						type="password"
						value={pin}
						onChange={(e) => setPin(e.target.value)}
					/>
				</div>
			</div>

			{/* Preview Transaction */}
			{amountUSD && assetUnits && receiverHash && (
				<div style={{ marginTop: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
					<h4>Transaction Preview</h4>
					<p><strong>USD:</strong> ${amountUSD}</p>
					<p><strong>{assetSymbol}:</strong> {assetUnits}</p>
					<p><strong>Fee:</strong> $0.00</p>
					<p><strong>To:</strong> {receiverHash}</p>
				</div>
			)}

			<Button text="PROCEED" onClick={handleSend} />

			{status && <span style={{ marginTop: '1rem', display: 'block' }}>{status}</span>}

			{/* Transaction Result */}
			{txResult && (
				<div style={{ marginTop: '2rem', border: '1px solid #aaa', padding: '1rem', borderRadius: '8px' }}>
					<h4>Transaction Summary</h4>
					<p><strong>ID:</strong> {txResult._id}</p>
					<p><strong>From:</strong> {txResult.sender}</p>
					<p><strong>To:</strong> {txResult.receiver}</p>
					<p><strong>Asset:</strong> {txResult.assetSymbol}</p>
					<p><strong>Asset Amount:</strong> {txResult.assetAmount}</p>
					<p><strong>USD Value:</strong> ${txResult.totalValue}</p>
					<p><strong>Fee:</strong> $0.00</p>
					{/* <p><strong>Timestamp:</strong>{dateParser(txResult.createdAt)}</p> */}
				</div>
			)}
		</div>
	);
};

export default SendAsset;
