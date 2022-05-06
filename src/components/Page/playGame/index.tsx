import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Button } from 'react-bootstrap';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { DatasetAndThing } from './../../../models/DatasetAndThing';
import { QuizListLoader } from './quizListLoader';
import { GameLoader } from './gameLoader';
import { CustomButtonYesNo } from '../../common/buttonToYesNoModal/customButtonYesNo';

export const PlayGame: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const [selectedQuiz, setSelectedQuiz] = useState<DatasetAndThing | null>(null);

	return (
		<>
			<h3 className='main-title'>{t("playGame.title")}</h3>

			{
				selectedQuiz === null ?
				<QuizListLoader onQuizSelected={setSelectedQuiz} /> :
				<GameLoader quizData={selectedQuiz} /> 
			}

			{
				selectedQuiz === null ?
				<Button variant='light' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button> :
				<div className='back-btn'>
					<CustomButtonYesNo variant="light" modalText={t("playGame.modal.confirmClose")} onConfirm={() => GoBack()}>
							{t("page.common.back")}
					</CustomButtonYesNo>
				</div>
			}			
		</>
	);
}