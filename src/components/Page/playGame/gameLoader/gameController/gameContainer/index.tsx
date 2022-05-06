import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import { GameContext } from '../../../../../../contexts/GameContext';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { getString } from '../../../../../../helpers/LangReader';
import { TITLE } from '../../../../../../constants/SolidQuizMissingValues';

export const GameContainer: React.FC<Props> = (props: Props) => {	
	const { t, lang } = useContext(TranslateContext);
	const { gameStatus, getQuizData, multiLang } = useContext(GameContext);
	
	const title = getString(getQuizData().thing, TITLE, multiLang, lang);

	return (
		<Container>
			<h3 className='main-title'>{t("playGame.game.title")}: {title}</h3>
			
			<Row>
				<Col>
					<Alert variant='light'>{t("playGame.game.actQuestion")}: {gameStatus.actQuestionIndex}</Alert>				
				</Col>
				<Col className='justify-content-right'>
					<Alert variant='light'>{t("playGame.game.allQuestions")}: {gameStatus.allQuestions}</Alert>				
				</Col>
			</Row>
			
			{props.children}
		</Container>
	);
}