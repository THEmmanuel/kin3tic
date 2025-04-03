import React from 'react';
import style from './NullWalletHome.module.css';
import AssetCard from '../../components/AssetCard/AssetCard';
import Button from '../../components/Button/Button';

const NullWalletHome = () => {
	return (
		<div className={style.NullWalletHome}>
			<div className={style.NullWalletHomeHeader}>
				<span>
					NULL WALLET v0.1
				</span>

				<div className={style.NullWalletHomeHeaderSub}>
					<span>
						WELCOME BACK
					</span>

					<span>
						NULLNET ALPHA
					</span>
				</div>
			</div>

			<div className={style.NullWalletHomeBalance}>
				<span>WALLET VALUE</span>
				<span>78858541 USD</span>
			</div>

			<div className={style.NullWalletHomeAssets}>
				<AssetCard />
				<AssetCard />
				<AssetCard />
				<AssetCard />
				<AssetCard />
				<AssetCard />
			</div>

			<div className={style.NullWalletHomeButtons}>
				<Button text='IMPORT NEW' />
				<Button text='CREATE NEW' />
			</div>
		</div>
	)
}

export default NullWalletHome;