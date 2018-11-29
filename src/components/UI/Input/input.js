import React from 'react';
import './input.scss';

const input = props => {
	let inputElement = null;
	let validationError = null;
	const inputClasses = ['InputElement']
	if(props.invalid && props.touched) {
		inputClasses.push('invalid');
		validationError = (<span className="invalid-warning">Please enter a correct value!</span>)
	}

	switch (props.elementType) {
		case 'input':
			inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
			break;
		case 'select':
			inputElement = (<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
												{props.elementConfig.options.map(option => (
													<option key={option.value} value={option.value}>{option.displayValue}</option>
												))}
											</select>
			)
			break;
		default:
			inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
	}

	return (
		<div className="Input">
			<label className="Label">{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default input;
