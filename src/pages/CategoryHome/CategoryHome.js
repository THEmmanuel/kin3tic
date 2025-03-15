import React from 'react';
import style from './CategoryHome.module.css';
import ActionButton from '../../components/ActionButton/ActionButton';
import addIcon from '../../assets/addIcon.svg';
import encodeIcon from '../../assets/lockIcon.svg'
import decodeIcon from '../../assets/unlockIcon.svg'
import scanIcon from '../../assets/scanIcon.svg'

const Home = () => {
	return (
		<div className={style.Home}>
			<div className={style.HomeWrapper}>
				<span className={style.HomeHeading}>KINETIC KEY</span>

				<span className={style.HomeDescription}>
					Kinetic Keys are unique, Zero Knowledge, cryptographic and mathematical unlock codes that provide private, string-based data storage.
				</span>
			</div>

			<div className={style.HomeCategoryWrapper}>
				<ActionButton
					icon={addIcon}
					text='CREATE UNLOCK HASH'
				/>

				<ActionButton
					icon={encodeIcon}
					text='ENCODE KINETIC KEY'
				/>

				<ActionButton
					icon={decodeIcon}
					text='DECODE KINETIC KEY'
				/>

				<ActionButton
					icon = {scanIcon}
					text='KINETIC KEY SCANNER'
				/>

				<ActionButton
					icon = {scanIcon}
					text='UNLOCK HASH SCANNER'
				/>
			</div>
		</div>
	);
}

export default Home;