import React from 'react';

import style from './CreateUnlockHash.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const CreateUnlockHash = () => {
	return (
		<div className={style.CreateUnlockHash}>
			CREATE UNLOCK HASH

			<div className={style.CreateUnlockHashDataWrapper}>
				<div className={style.CreateUnlockHashDataInput}>
					<Input
						label="UNLOCK PHRASE/PASSWORD"
						placeholder="ENTER UNLOCK PHRASE/PASSWORD"
					/>

					<Input
						label="RE-ENTER UNLOCK PHRASE/PASSWORD"
						placeholder="RE-ENTER ENTER UNLOCK PHRASE/PASSWORD"
					/>
				</div>

				<span className={style.DecodeKeyDetectionResult}>
					UNLOCK HASH CREATED
				</span>

				<span>
					UNLOCK HASH: YR3444343HD894
				</span>


				<Button
					text={"CREATE UNLOCK HASH"}
				// onClick={() => DecodeKey()}
				/>
			</div>
		</div>
	)
}

export default CreateUnlockHash;