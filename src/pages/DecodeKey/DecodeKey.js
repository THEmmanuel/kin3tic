import React, { useState } from "react";
import style from "./DecodeKey.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axios from "axios";

const DecodeKey = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API;

	const [keyToken, setKeyToken] = useState("");
	const [passphrase, setPassphrase] = useState("");
	const [keyData, setKeyData] = useState(null);
	const [decodedData, setDecodedData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchKeyDetails = async () => {
		try {
			setError(null);
			setLoading(true);
			const response = await axios.post(`${API_URL}/kinetic-keys/key/token`, { keyToken });
			setKeyData(response.data);
			setDecodedData(null);
		} catch (err) {
			setError(err.response?.data?.error || "Failed to fetch key details");
		} finally {
			setLoading(false);
		}
	};

	const decryptKey = async () => {
		try {
			setError(null);
			setLoading(true);
			const response = await axios.post(`${API_URL}/kinetic-keys/decrypt`, {
				voucherCode: keyToken,
				passphrase
			});
			setDecodedData(response.data);
			setKeyData(prev => prev ? { ...prev, isDecrypted: true } : prev);
		} catch (err) {
			setError(err.response?.data?.error || "Decryption failed");
		} finally {
			setLoading(false);
		}
	};

	const resetState = () => {
		setKeyToken("");
		setPassphrase("");
		setKeyData(null);
		setDecodedData(null);
		setError(null);
	};

	const isValidNumber = (value) => {
		return !isNaN(value) && value.trim() !== "";
	};

	return (
		<div>
			<h2>DECODE KEY</h2>

			<div className={style.DecodeKeyDataInput}>
				<Input
					label="KINETIC KEY"
					placeholder="ENTER KINETIC KEY"
					value={keyToken}
					onChange={(e) => setKeyToken(e.target.value)}
				/>
				<Button text={loading ? "LOADING..." : "VALIDATE KEY"} onClick={fetchKeyDetails} disabled={loading} />
			</div>

			{keyData && (
				<div className={style.DecodeKeyData}>
					<span className={style.DecodeKeyDetectionResult}>VALID KEY DETECTED</span>
					<span>IDENTIFIER: {keyData.key._id}</span>
					<span>UNLOCK HASH: {keyData.unlockHash}</span>
					<span>CREATED ON: {new Date(keyData.key.timestamp).toLocaleString()}</span>
					<span>
						STATUS: {keyData.key.isDecrypted ? "Already Decrypted" : "Pending Decryption"}
					</span>
				</div>
			)}

			{keyData && !keyData.isDecrypted && (
				<div className={style.DecodeKeyDataInput}>
					<Input
						label="KEY UNLOCK PHRASE/PASSWORD"
						placeholder="ENTER KEY UNLOCK PHRASE"
						value={passphrase}
						onChange={(e) => setPassphrase(e.target.value)}
					/>
					<Button text={loading ? "LOADING..." : "DECODE KEY"} onClick={decryptKey} disabled={loading} />
				</div>
			)}

			{decodedData && (
				<div className={style.DecodeKeyData}>
					<span>Decrypted Data: {decodedData.decryptedData}</span>
					{/* {isValidNumber(decodedData.decryptedData) ? (
						<div>
							<span>This key makes you eligible for a payout of:</span>
							<h3>N{Number(decodedData.decryptedData).toLocaleString()}</h3>
							<Button text={`PAYOUT N${Number(decodedData.decryptedData).toLocaleString()}`} onClick={() => alert("Payout initiated!")} />
						</div>
					) : (
					)} */}
					<Button text="REFRESH" onClick={resetState} />
				</div>
			)}

			{error && <div className={style.error}>{error}</div>}
		</div>
	);
};

export default DecodeKey;