import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button } from 'react-bootstrap';
import { TranslateContext } from '../../../../../../../../../../contexts/TranslateContext';
import { GameContext } from '../../../../../../../../../../contexts/GameContext';
import { getString } from '../../../../../../../../../../helpers/LangReader';
import { ANSWER_TEXT } from '../../../../../../../../../../constants/SolidQuizMissingValues';

export const Answer: React.FC<Props> = (props: Props) => {
	const { lang } = useContext(TranslateContext);
	const { multiLang, gameStatus } = useContext(GameContext);
	const [answerText, setAnswerText] = useState<string>("");
	const [btnVariant, setBtnVariant] =  useState("secondary");

	useEffect(() => {		
		const text = getString(props.answerThing, ANSWER_TEXT, multiLang, lang);

		setBtnVariant("secondary");

		setAnswerText(text);
	}, [props.answerThing, lang, multiLang, gameStatus.actQuestionIndex ]);

	const handleClick = () => {
		const answerSelectedResult = props.onAnswerSelected(props.answerThing);

		if (answerSelectedResult) {
			setBtnVariant("success");
		}
		else{
			setBtnVariant("danger");
		}
	};

	return (
		<>
			<Button variant={btnVariant} disabled={props.disabled} onClick={handleClick}>{answerText}</Button>
		</>
	);
}