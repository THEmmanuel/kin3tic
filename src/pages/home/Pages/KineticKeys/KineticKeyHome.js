import React from 'react';
import style from './KineticKeyHome.module.css'
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';

const KineticKeyHome = () => {
	return (
		<div className={style.KineticKeyHome}>
			<div className={style.KineticKeyHomeWrapper}>
				<span className={style.KineticKeyHomeHeading}>
					KINETIC KEY
				</span>

				<span className={style.KineticKeyHomeDescription}>
					Kinetic Keys are unique, Zero Knowledge, cryptographic and mathematical unlock codes that provide private, string based data storage.
				</span>
			</div>

			<div className={style.KineticKeyHomeFormWrapper}>
				<div className={style.KineticKeyHomeForm}>
					<Input
						label="KEY UNLOCK HASH"
						placeholder="ENTER KEY UNLOCK HASH"
					/>

					<Input
						label="KEY VALUE"
						placeholder="ENTER THE VALUE TO BE STORED"
					/>
				</div>


				<Button
					text="CREATE KEY"
				/>
			</div>
		</div>
	)
}

export default KineticKeyHome;