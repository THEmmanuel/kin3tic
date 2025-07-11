import React from 'react';
import style from './CategoryHome.module.css';
import ActionButton from '../../components/ActionButton/ActionButton';
import addIcon from '../../assets/addIcon.svg';
import encodeIcon from '../../assets/lockIcon.svg'
import decodeIcon from '../../assets/unlockIcon.svg'
import scanIcon from '../../assets/scanIcon.svg'
import paperIcon from '../../assets/paperIcon.svg'
import walletIcon from '../../assets/walletIcon.svg'
import { Link } from 'react-router-dom';


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
			<Link to='/nullwallet/start'>
					<ActionButton
						icon={walletIcon}
						text='START NULL WALLET'
					/>
				</Link>

				<Link to='/create-unlock-hash'>
					<ActionButton
						icon={addIcon}
						text='CREATE UNLOCK HASH'
					/>
				</Link>

				<Link to='/encode-kinetic-key'>
					<ActionButton
						icon={encodeIcon}
						text='ENCODE KINETIC KEY'
					/>
				</Link>

				<Link to='/decode-kinetic-key'>
					<ActionButton
						icon={decodeIcon}
						text='DECODE KINETIC KEY'
					/>
				</Link>

				<Link to='/kinetic-key-scanner'>
					<ActionButton
						icon={scanIcon}
						text='KINETIC KEY SCANNER'
					/>
				</Link>

				<Link to='/unlock-hash-scanner'>
					<ActionButton
						icon={scanIcon}
						text='UNLOCK HASH SCANNER'
					/>
				</Link>

				<a
					href="https://emmanuels-organization-21.gitbook.io/kinetic/kinetic-keys-a-lightweight-zero-knowledge-framework-for-secure-digital-transactions"
					target="_blank"
					rel="noopener noreferrer"
				>
					<ActionButton
						icon={paperIcon}
						text="WHITEPAPER [EXT LINK]"
					/>
				</a>

			</div>
		</div>
	);
}

export default Home;