import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { IoMdCheckmark } from "@react-icons/all-files/io/IoMdCheckmark";
import { ToggleButton } from 'react-bootstrap';

export const ToggleBtnCheck: React.FC<Props> = (props: Props) => {
	const [checked, setChecked] = useState(props.defaultChecked)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);

		props.onChange(props.value, event.target.checked);
	}

	return (
		<>
			<ToggleButton
				key={props.value}
				id={`radio-${props.value}`}
				type="radio"
				variant="outline-success"
				name="radio"
				value={props.value}
				checked={checked}
				onChange={handleChange}
				disabled={props.disabled}
			>
				<IoMdCheckmark />
			</ToggleButton>
		</>
	);
}