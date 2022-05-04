import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Alert, Button } from 'react-bootstrap';
import { QuizForm } from './quizForm';
import { QuizContainer } from './../../../models/QuizContainer';
import * as quizService from '../../../services/QuizService'
import * as questionService from '../../../services/QuestionService'
import { QuizFormModel } from '../../../models/QuizFormModel';
import { WorkspaceContext } from './../../../contexts/WorkspaceContext';
import { QuestionForm } from './questionForm';
import { useSession } from '@inrupt/solid-ui-react';
import { SpinnerContext } from '../../../contexts/SpinnerContext';
import { QuestionCreateModel } from './../../../models/QuestionCreateModel';
import { QuestionCreationContextComponent } from '../../common/questionCreationContextComponent';

export const CreateQuiz: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const { workspaceUrl, webId } = useContext(WorkspaceContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [alert, setAlert] = useState<string | null>(null);
	const [quizContainer, setQuizContainer] = useState<QuizContainer | null>(null);

	const quizFormSubmitted = (quizFormModel: QuizFormModel) => {
		SpinAround(async () => {
			//create quizName and check if reserved
			const quizName = quizService.createQuizResourceName(quizFormModel); //lets be the quiz things name and also the datasets name
			const nameIsAlreadyReserved = await quizService.checkQuizTitleIsAlreadyReserved(quizName, workspaceUrl, session.fetch);

			if (nameIsAlreadyReserved) {
				setAlert(t("createQuiz.quiz.nameIsAlreadyReserved"));
			}
			else{
				//if not reserved create container
				setQuizContainer(quizService.createQuizContainer(quizName, quizFormModel, webId));
				setAlert(null);
			}
		});		
	}

	const questionSubmitted = (questionModel: QuestionCreateModel) => {
		if (quizContainer === null) {
			console.log("questionSubmitted called when quizContainer is missing!");
			return;
		}

		//create question container
		const quizUri = quizService.getQuizzesUri(workspaceUrl, quizContainer.quizName);
		const questionContainer = questionService.createQuestionThing(questionModel, quizUri);

		//update container
		setQuizContainer((model) => {
			if( model === null){
				return null;
			}

			let rv = {
				...model
			};

			rv.questions.push(questionContainer);

			return rv;
		});
	}

	const content = quizContainer === null ? 
		<QuizForm afterFormSubmit={quizFormSubmitted} /> : 
		<QuestionCreationContextComponent>
			<QuestionForm multiLang={quizContainer.quizFormModel.multiLang} questionSubmitted={questionSubmitted} />
		</QuestionCreationContextComponent>

	return (
		<>
			{content}
			{alert !== null && 
			<Alert variant='danger'>{alert}</Alert>}
			<Button className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}