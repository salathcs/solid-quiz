import React, { useState } from 'react';
import { Props } from './types';
import './styles.css';
import { defaultSpinnerState, SpinnerContext } from '../../contexts/SpinnerContext';
import { Spinner } from './Spinner';

export const SpinnerContextComponent: React.FC<Props> = (props: Props) => {
	const [showSpinner, setShowSpinner] = useState(defaultSpinnerState.showSpinner);

	const toggleSpinner = () => {
		setShowSpinner(!showSpinner);
	  };

	return (
		<SpinnerContext.Provider value={{
				showSpinner,
				toggleSpinner,
			}}>
				<Spinner>
					{props.children}
				</Spinner>
		</SpinnerContext.Provider>
	);
}