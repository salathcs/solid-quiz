import React, { useCallback, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { defaultSpinnerState, SpinnerContext } from '../../../contexts/SpinnerContext';
import { Spinner } from './spinner';
import SpinnerCounter from '../../../helpers/SpinnerCounter';

export const SpinnerContextComponent: React.FC<Props> = (props: Props) => {
	const [showSpinner, setShowSpinner] = useState(defaultSpinnerState.Spinner);
	const [spinnerCounter] = useState<SpinnerCounter>(new SpinnerCounter());

	const ShowSpinner = useCallback(() => {
		const spinner = spinnerCounter.Increase();
		setShowSpinner(spinner);
	}, [spinnerCounter]);

	const HideSpinner = useCallback(() => {
		const spinner = spinnerCounter.Decrease();
		setShowSpinner(spinner);
	}, [spinnerCounter]);

	const SpinAround = useCallback(async (delegate: () => Promise<void>) => {
		ShowSpinner();
		await delegate().catch((error: any) => {
			console.log(error);
		}).finally(() =>{
		  HideSpinner();
		});
	}, [ShowSpinner, HideSpinner]);

	return (
		<SpinnerContext.Provider value={{
				Spinner: showSpinner,
				ShowSpinner,
				HideSpinner,
				SpinAround,
			}}>
				{props.children}
				<Spinner />
		</SpinnerContext.Provider>
	);
}