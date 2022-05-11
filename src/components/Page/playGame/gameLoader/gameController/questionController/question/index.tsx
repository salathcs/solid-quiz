import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../../../../../contexts/TranslateContext';
import { getString } from '../../../../../../../helpers/LangReader';
import { GameContext } from '../../../../../../../contexts/GameContext';
import { QUESTION_TEXT } from './../../../../../../../constants/SolidQuizMissingValues';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { AnswerLoader } from './answerLoader';

export const Question: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const { multiLang } = useContext(GameContext);
	const [questionText, setQuestionText] = useState<string>("");

	useEffect(() => {		
		const text = getString(props.questionThing, QUESTION_TEXT, multiLang, lang);

		setQuestionText(text);
	}, [props.questionThing, lang, multiLang ]);

	return (
		<>
			<Row>
				<Col>
					<FloatingLabel controlId="floatingTextarea" label={t("playGame.game.questionText")} className="mb-3">
						<Form.Control as="textarea"	placeholder={t("playGame.game.questionText")} className='textarea-style' defaultValue={questionText} disabled />
					</FloatingLabel>					
				</Col>
			</Row>
			
			<Row className='answers-row'>
				<AnswerLoader questionThing={props.questionThing} />
			</Row>
		</>
	);
}