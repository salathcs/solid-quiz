import React, { useContext, useEffect } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { SpinnerContext } from '../../../../contexts/SpinnerContext';

export const Spinner: React.FC<Props> = (props: Props) => {
	const { Spinner, HideSpinner } = useContext(SpinnerContext);

	useEffect(() => {
		const timer = setTimeout(() => {
			HideSpinner();
		}, 1000);
		return () => clearTimeout(timer);
	  }, [HideSpinner]);

	return (	
		<>
			{Spinner &&
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