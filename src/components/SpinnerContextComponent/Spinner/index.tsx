import React, { useContext, useEffect } from 'react';
import { Props } from './types';
import './styles.css';
import { SpinnerContext } from './../../../contexts/SpinnerContext';

export const Spinner: React.FC<Props> = (props: Props) => {
	const { showSpinner, toggleSpinner } = useContext(SpinnerContext);

	useEffect(() => {
		const timer = setTimeout(() => {
		  toggleSpinner();
		}, 1000);
		return () => clearTimeout(timer);
		// eslint-disable-next-line
	  }, []);

	return (	
		<>
			{props.children}
			{showSpinner &&
			<div className="spinner-uter-container">
				<div className='flex-container-spinner'>
					<div className="spinner-container">
						<div className="loading-spinner">
						</div>
					</div>
				</div>
			</div>}	
		</>	
	);
}