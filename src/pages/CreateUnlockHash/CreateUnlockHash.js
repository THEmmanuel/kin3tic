import React, { useState } from "react";
import axios from "axios";
import style from "./CreateUnlockHash.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const CreateUnlockHash = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API;

	const [passphrase, setPassphrase] = useState("");
	const [confirmPassphrase, setConfirmPassphrase] = useState("");
	const [unlockHash, setUnlockHash] = useState(null);
	const [error, setError] = useState(null);

	const handleGenerateHash = async () => {
		console.log("API_URL:", API_URL);
		console.log("Passphrase Entered:", passphrase);
		console.log("Confirm Passphrase Entered:", confirmPassphrase);

		if (passphrase !== confirmPassphrase) {
			console.warn("Passphrases do not match");
			setError("Passphrases do not match");
			return;
		}
		try {
			setError(null);
			console.log("Sending request to:", `${API_URL}/unlock-hash/generate`);
			const response = await axios.post(`${API_URL}/unlock-hash/generate`, { passphrase });
			console.log("Response received:", response.data.keyUnlockHash);
			setUnlockHash(response.data.data.keyUnlockHash);
		} catch (error) {
			console.error("Error during API request:", error);
			setError(error.response?.data?.error || "Failed to generate unlock hash");
		}
	};

	const handleCopy = () => {
		if (unlockHash) {
			navigator.clipboard.writeText(unlockHash);
			alert("Unlock hash copied to clipboard!");
		}
	};

	const handleReset = () => {
		setPassphrase("");
		setConfirmPassphrase("");
		setUnlockHash(null);
		setError(null);
	};

	return (
		<div className={style.CreateUnlockHash}>
			<h2>CREATE UNLOCK HASH</h2>
			<div className={style.CreateUnlockHashDataWrapper}>
				<div className={style.CreateUnlockHashDataInput}>
					<Input
						label="UNLOCK PHRASE/PASSWORD"
						placeholder="ENTER UNLOCK PHRASE/PASSWORD"
						value={passphrase}
						onChange={(e) => setPassphrase(e.target.value)}
					/>
					<Input
						label="RE-ENTER UNLOCK PHRASE/PASSWORD"
						placeholder="RE-ENTER UNLOCK PHRASE/PASSWORD"
						value={confirmPassphrase}
						onChange={(e) => setConfirmPassphrase(e.target.value)}
					/>
				</div>
				{error && <span className={style.Error}>{error}</span>}
				{unlockHash ? (
					<div className={style.UnlockHashTextWrapper}>
						<span className={style.DecodeKeyDetectionResult}>
							UNLOCK HASH: {unlockHash}
						</span>

						<div className={style.DecodeKeyDetectionResultButtons}>
							<Button text="COPY" onClick={handleCopy} />
							<Button text="CREATE NEW UNLOCK HASH" onClick={handleReset} />
						</div>
					</div>
				) : (
					<Button text="CREATE UNLOCK HASH" onClick={handleGenerateHash} />
				)}
			</div>
		</div>
	);
};

export default CreateUnlockHash;
