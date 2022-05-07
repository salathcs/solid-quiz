import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Alert, Button } from 'react-bootstrap';
import { QuizForm } from './quizForm';
import { QuizContainer } from './../../../models/QuizContainer';
import * as quizService from '../../../services/QuizService'
import * as questionService from '../../../services/QuestionService'
import * as quizContainerConverter from '../../../helpers/QuizContainerConverter'
import { QuizFormModel } from '../../../models/QuizFormModel';
import { WorkspaceContext } from './../../../contexts/WorkspaceContext';
import { QuestionForm } from './questionForm';
import { useSession } from '@inrupt/solid-ui-react';
import { SpinnerContext } from '../../../contexts/SpinnerContext';
import { QuestionCreateModel } from './../../../models/QuestionCreateModel';
import { QuestionCreationContextComponent } from '../../common/questionCreationContextComponent';
import { InfoModal } from '../../common/infoModal';
import { CreationResult } from './creationResult';
import { Thing } from '@inrupt/solid-client';

export const CreateQuiz: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { t, lang } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const { workspaceUrl, webId } = useContext(WorkspaceContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [alert, setAlert] = useState<string | null>(null);
	const [quizContainer, setQuizContainer] = useState<QuizContainer | null>(null);
	const [firstFormModel, setFirstFormModel] = useState<QuestionCreateModel | undefined>(undefined);
	const [modalErrorMsg, setModalErrorMsg] = useState<string | null>(null);
	const [creationResult, setCreationResult] = useState<Thing | null>(null);

	useEffect(() => {
		if (props.datasetAndThing !== undefined) {
			let propQuizContainer: QuizContainer | null = null;

			try {
				propQuizContainer = quizContainerConverter.convert(props.datasetAndThing.thing, props.datasetAndThing.dataset, lang);
			} catch (error) {
				console.log(error);
				setModalErrorMsg(t("modifyQuiz.modal.modificationFailed"));
			}

			setQuizContainer(propQuizContainer);
			if (propQuizContainer !== null) {
				setFirstFormModel(propQuizContainer.questions.find((item) => item.questionModel.questionNumber === 1)?.questionModel);
			}
		}
	}, [props.datasetAndThing, lang, t]);

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
		const quizUri = quizService.getSpecificQuizUri(workspaceUrl, quizContainer.quizName);
		const questionContainer = questionService.createQuestionContainer(questionModel, quizUri);

		//update container
		setQuizContainer((model) => {
			if( model === null){
				return null;
			}

			let rv = {
				...model
			};

			//replace or push new to questions
			const element = rv.questions.find((item) => item.questionName === questionContainer.questionName);
			if (element !== undefined) {
				const indexOf = rv.questions.indexOf(element);
				rv.questions[indexOf] = questionContainer;
			}
			else{ 
				rv.questions.push(questionContainer);
			}

			return rv;
		});
	}

	const finishQuiz = () => {
		SpinAround(async () => {	
			if (quizContainer === null) {
				console.log("finishQuiz called when quizContainer is null!");
				return;
			}
			
			const savedQuizThing = await quizService.saveNewQuiz(quizContainer, workspaceUrl, session.fetch);

			setCreationResult(savedQuizThing);
		});	
	}

	if (creationResult !== null) {
		return <CreationResult quizThing={creationResult} />;
	}

	const content = quizContainer === null ? 
		<QuizForm afterFormSubmit={quizFormSubmitted} /> : 
		<QuestionCreationContextComponent quizContainer={quizContainer}> 
			<QuestionForm 
				multiLang={quizContainer.quizFormModel.multiLang} 
				questionSubmitted={questionSubmitted} 
				finishQuiz={finishQuiz} 
				questionCreateModel={firstFormModel} />
		</QuestionCreationContextComponent>

	return (
		<>
			{content}
			{alert !== null && 
			<Alert variant='danger'>{alert}</Alert>}
			<Button variant='light' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>

			<InfoModal show={modalErrorMsg !== null} onHide={() => setModalErrorMsg(null)} body={modalErrorMsg ?? "error"} />
		</>
	);
}