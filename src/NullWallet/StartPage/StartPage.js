import React from 'react';
import style from './StartPage.module.css';
import Button from '../../components/Button/Button';

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
				<Button
					text="CREATE NEW WALLET"
				/>

				<Button
					text="IMPORT AN EXISTING WALLET"
				/>
			</div>
		</div>
	)
}

export default NullStartPage;