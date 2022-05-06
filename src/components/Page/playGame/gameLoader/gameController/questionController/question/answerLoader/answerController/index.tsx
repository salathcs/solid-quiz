import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Thing, getUrl } from '@inrupt/solid-client';
import SOLIDQUIZ from '../../../../../../../../../helpers/SOLIDQUIZ';
import { Answer } from './answer';
import { Button } from 'react-bootstrap';
import { TranslateContext } from '../../../../../../../../../contexts/TranslateContext';
import { GameContext } from '../../../../../../../../../contexts/GameContext';
import * as quizResultService from '../../../../../../../../../services/QuizResultService';
import { addNewQuestionResult } from '../../../../../../../../../helpers/GameHelper';

export const AnswerController: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { setGameStatus } = useContext(GameContext);
	const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
	const [answerSelected, setAnswerSelected] = useState(false);
	const [answerBtns, setAnswerBtns] = useState<JSX.Element[]>([]);

	const onAnswerSelected = useCallback((answerThing: Thing) => {
		setAnswerSelected(true);
		const success = answerThing.url === correctAnswer;

		setGameStatus((act) => {
			let rv = { ...act };

			const newQuestionResultThing = quizResultService.createQuestionResult(props.questionThing, answerThing, success);
			addNewQuestionResult(rv, newQuestionResultThing);

			return rv;
		});

		return success;
	}, [correctAnswer, setGameStatus, props.questionThing]);

	const onNextClick = () => {
		setAnswerSelected(false);

		setGameStatus((act) => {
			let rv = { ...act };

			rv.actQuestionIndex++;

			return rv;
		});
	};

	useEffect(() => {
		const correctAnswerThingUri = getUrl(props.questionThing, SOLIDQUIZ.correctAnswerOption.value);
		setCorrectAnswer(correctAnswerThingUri);

		setAnswerBtns(
			props.answerThings.map((thing, indx) => 
				<Answer key={indx} answerThing={thing} onAnswerSelected={onAnswerSelected} disabled={answerSelected} />)
		);
	}, [props.questionThing, props.answerThings, onAnswerSelected, answerSelected]);

	return (
		<div className='d-grid gap-3'>
			{answerBtns}

			{
				answerSelected &&
				<Button variant="warning" className='next-btn' onClick={onNextClick}>{t("playGame.game.btn.nextQuestion")}</Button> 
			}
		</div>
	);
}