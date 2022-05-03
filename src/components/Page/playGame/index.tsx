import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Button } from 'react-bootstrap';
import { TranslateContext } from '../../../contexts/TranslateContext';

export const PlayGame: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);

	return (
		<>
			<h3 className='main-title'>{t("playGame.title")}</h3>
			<Button onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}