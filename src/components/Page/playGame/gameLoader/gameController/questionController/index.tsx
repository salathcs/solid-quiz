import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { GameContext } from '../../../../../../contexts/GameContext';
import { Thing } from '@inrupt/solid-client';
import { Question } from './question';
import { addNumberOfSuccessToQuizResult } from '../../../../../../helpers/GameHelper';
import * as quizResultService from '../../../../../../services/QuizResultService';
import { useSession } from '@inrupt/solid-ui-react';
import { SpinnerContext } from '../../../../../../contexts/SpinnerContext';
import { getThing } from '@inrupt/solid-client';
import { getSavedQuizResultName } from '../../../../../../helpers/QuizResultsListHelper';

export const QuestionController: React.FC<Props> = ({ questions, onCompleteGame }) => {
	const { session } = useSession();
	const { gameStatus } = useContext(GameContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [actQuestion, setActQuestion] = useState<Thing | null>(null);

	useEffect(() => {
		if (gameStatus.actQuestionIndex >= questions.length) {
			SpinAround(async () => {
				addNumberOfSuccessToQuizResult(gameStatus);

				const updatedDataset = await quizResultService.saveQuizResult(
					gameStatus.quizResultNameUri, 
					gameStatus.quizResultThing, 
					gameStatus.questionResultThings, 
					session.fetch);

				const savedThingName = getSavedQuizResultName(gameStatus.quizResultNameUri, gameStatus.quizResultThing);
				const updatedThing = getThing(updatedDataset, savedThingName);

				if (updatedThing === null) {
					throw new Error("persist result failed!");
				}
		
				onCompleteGame({ gameStatus, savedQuizResultData: { dataset: updatedDataset, thing: updatedThing } });
			});	
		}
		else{
			setActQuestion(questions[gameStatus.actQuestionIndex]);
		}
	}, [gameStatus.actQuestionIndex, questions, onCompleteGame, gameStatus, session.fetch, SpinAround]);

	return (
		<>
			{actQuestion !== null &&
			<Question questionThing={actQuestion} />}
		</>
	);
}