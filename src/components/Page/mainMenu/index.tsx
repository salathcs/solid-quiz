import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button } from 'react-bootstrap';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { PlayGame } from '../playGame';
import { CreateQuiz } from './../createQuiz/index';
import { Leaderboard } from './../leaderboard/index';
import { HelpPage } from './../helpPage/index';
import { ModifyQuiz } from '../modifyQuiz';

export const MainMenu: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { SwitchTo } = useContext(PageSwitcherContext);

	const switchToPlayGame = () => SwitchTo(<PlayGame />);
	const switchToCreateQuiz = () => SwitchTo(<CreateQuiz />);
	const switchToModifyQuiz = () => SwitchTo(<ModifyQuiz />);
	const switchToLeaderboard = () => SwitchTo(<Leaderboard />);
	const switchToHelpPage = () => SwitchTo(<HelpPage />);

	return (
		<>
			<h3 className='main-title'>{t("mainMenu.title")}</h3>
			<div className="d-grid gap-4">
				<Button variant="primary" size="lg" onClick={switchToPlayGame}>{t("mainMenu.btn.playGame")}</Button>
				<Button variant="secondary" size="lg" onClick={switchToCreateQuiz}>{t("mainMenu.btn.createQuiz")}</Button>
				<Button variant="secondary" size="lg" onClick={switchToModifyQuiz}>{t("mainMenu.btn.modifyQuiz")}</Button>
				<Button variant="light" size="lg" onClick={switchToLeaderboard}>{t("mainMenu.btn.leaderboard")}</Button>
				<Button variant="info" size="lg" onClick={switchToHelpPage}>{t("mainMenu.btn.helpPage")}</Button>
			</div>
		</>
	);
}