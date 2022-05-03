import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Button } from 'react-bootstrap';

export const CreateQuiz: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);

	return (
		<>
			<h3 className='main-title'>{t("createQuiz.title")}</h3>
			<Button onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}