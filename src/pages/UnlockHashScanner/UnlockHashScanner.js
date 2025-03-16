import React, { useEffect, useState } from 'react';
import style from './UnlockHashScanner.module.css';
import axios from 'axios';
import truncateString from '../../utils/truncateString';


const UnlockHashScanner = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API;
	const [hashes, setHashes] = useState([]);

	useEffect(() => {
		const fetchHashes = async () => {
			try {
				const response = await axios.get(`${API_URL}/unlock-hash`);
				setHashes(response.data.data);
			} catch (error) {
				console.error('Error fetching keys:', error);
			}
		};

		fetchHashes();
	}, []);

	return (
		<div className={style.KineticKeyScannerWrapper}>
			<div className={style.KineticKeyScannerHeading}>
				<span>KINETIC KEY SCANNER</span>
				<span>VIEW ALL GENERATED KEYS</span>
			</div>

			<div className={style.tableContainer}>
				<table className={style.table}>
					<thead>
						<tr>
							<th>Key Unlock Hash</th>
							<th>Key Token Count</th>
							<th>Timestamp</th>
						</tr>
					</thead>
					<tbody>
						{hashes.map((key) => (
							<tr key={key._id}>
								<td>
									{truncateString(key.keyUnlockHash)}
								</td>

								<td>
									{key.keyTokens.length}
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
}

export default UnlockHashScanner;