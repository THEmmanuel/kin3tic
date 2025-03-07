import React from 'react';
import style from './Input.module.css';

const Input = (props) => {
	return (
		<div className={style.InputWrapper}>
			<span className={style.InputLabel}>{props.label}</span>
			<input
				type="text"
				className={style.Input}
				placeholder={props.placeholder}
				value={props.value} // Bind value
				onChange={props.onChange} // Handle changes
			/>
		</div>
	);
};

export default Input;