import React, { useEffect, useState } from 'react';
import style from './KineticKeyScanner.module.css';
import axios from 'axios';
import truncateString from '../../utils/truncateString';


const KineticKeyScanner = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API;
	const [keys, setKeys] = useState([]);

	useEffect(() => {
		const fetchKeys = async () => {
			try {
				const response = await axios.get(`${API_URL}/kinetic-keys/keys`);
				setKeys(response.data);
			} catch (error) {
				console.error('Error fetching keys:', error);
			}
		};

		fetchKeys();
	}, []);

	return (
		<div className={style.KineticKeyScannerWrapper}>
			<div className={style.KineticKeyScannerHeading}>
				<span>KINETIC KEY SCANNER</span>
				<span>VIEW ALL GENERATED KEYS</span>
			</div>

			<div className='table-container'>
				<table className={style.table}>
					<thead>
						<tr>
							<th>Key</th>
							<th>Key Unlock Hash</th>
							<th>Key Decrypted</th>
							<th>Created At</th>
						</tr>
					</thead>

					<tbody>
						{keys.map((key) => (
							<tr key={key._id}>
								<td>
									{truncateString(key.keyToken)}
								</td>

								<td>
									{truncateString(key.keyUnlockHash)}
								</td>

								<td>
									{key.isDecrypted ? 'true' : 'false'}
								</td>

								<td>
									{new Date(key.timestamp).toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default KineticKeyScanner;