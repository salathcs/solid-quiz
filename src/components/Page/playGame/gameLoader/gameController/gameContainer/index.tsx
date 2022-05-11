import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import { GameContext } from '../../../../../../contexts/GameContext';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { getString } from '../../../../../../helpers/LangReader';
import { TITLE } from '../../../../../../constants/SolidQuizMissingValues';
import { CustomButtonYesNo } from '../../../../../common/buttonToYesNoModal/customButtonYesNo';
import { PageSwitcherContext } from '../../../../../../contexts/PageSwitcherContext';

export const GameContainer: React.FC<Props> = (props: Props) => {	
	const { t, lang } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const { gameStatus, getQuizData, multiLang } = useContext(GameContext);
	
	const title = getString(getQuizData().thing, TITLE, multiLang, lang);

	return (
		<Container>
			<h3 className='main-title'>{t("playGame.game.title")}: {title}</h3>
			
			<Row>
				<Col>
					<Alert variant='light'>{t("playGame.game.actQuestion")}: {gameStatus.actQuestionIndex + 1}</Alert>				
				</Col>
				<Col className='justify-content-right'>
					<Alert variant='light'>{t("playGame.game.allQuestions")}: {gameStatus.allQuestions}</Alert>				
				</Col>
			</Row>
			
			{props.children}

			<div className='back-btn'>
					<CustomButtonYesNo variant="light" modalText={t("playGame.modal.confirmClose")} onConfirm={() => GoBack()}>
							{t("page.common.back")}
					</CustomButtonYesNo>
				</div>
		</Container>
	);
}