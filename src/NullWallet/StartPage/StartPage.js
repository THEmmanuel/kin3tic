import React from 'react';
import style from './StartPage.module.css';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

const NullStartPage = () => {
	return (
		<div className={style.NullStartPage}>
			<div className={style.NullStartPageHeader}>
				<span>NULL WALLET v0.1</span>
				<span>WELCOME TO NULL WALLET</span>
			</div>

			<div>
				<span>

				</span>
			</div>


			<div className={style.NullStartPageButtons}>
				<Link to={`/NullWallet/Create`}>
					<Button
						text="CREATE NEW WALLET"
					/>
				</Link>

				<Link to={`/NullWallet/Import`}>
					<Button
						text="IMPORT AN EXISTING WALLET"
					/>
				</Link>
			</div>
		</div>
	)
}

export default NullStartPage;