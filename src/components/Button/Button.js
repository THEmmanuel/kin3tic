import React from 'react';
import style from './Button.module.css'

const Button = (props) => {
	return (
		<button
			className={style.Button}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	)
}

export default Button;