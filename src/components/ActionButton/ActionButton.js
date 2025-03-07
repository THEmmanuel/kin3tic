import React from 'react';
import style from './ActionButton.module.css'

const ActionButton = (props) => {
	return (
		<button
			className={style.ActionButton}
			onClick={props.onClick}
		>
			<img
				src={props.icon}
				alt="icon"
				className={style.ActionButtonIcon}
			/>

			<span
				className={style.ActionButtonText}
			>
				{props.text}
			</span>
		</button>
	)
}

export default ActionButton;