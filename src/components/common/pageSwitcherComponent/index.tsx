import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';

export const PageSwitcherComponent: React.FC<Props> = (props: Props) => {
	const [actualPage, setActualPage] = useState(props.defaultPage);

	return (
		<PageSwitcherContext.Provider value={{
			ActualPage: actualPage,
			SwitchTo: (page: JSX.Element) => setActualPage(page),
			GoBack: () => setActualPage(props.defaultPage),
		}}>
			{actualPage}
		</PageSwitcherContext.Provider>
	);
}