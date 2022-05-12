import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Alert, Button } from 'react-bootstrap';

export const HelpPage: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);

	return (
		<>
			<h3 className='main-title'>{t("helpPage.title")}</h3>

			<Alert>
				<p>{t("helpPage.text1")}</p>
				<p>{t("helpPage.text2")}</p>
				<p>{t("helpPage.text3")}</p>
				<p>
					{t("helpPage.text4")}
					<Button variant='link' href='https://solid-quiz.solidcommunity.net/profile/card#me' rel="noopener noreferrer" target="_blank">solid-quiz</Button>
					{t("helpPage.text5")}
				</p>
				<p>{t("helpPage.text6")}</p>
				<p>{t("helpPage.text7")}</p>
				<p>{t("helpPage.text8")}</p>
				<p>{t("helpPage.text9")}
				 	<Button variant='link' href='https://salathcs.solidcommunity.net/profile/card#me' rel="noopener noreferrer" target="_blank" >salathcs</Button>
				</p>
			</Alert>

			<Button variant='outline-primary' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}