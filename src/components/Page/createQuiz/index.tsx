import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Button } from 'react-bootstrap';
import { QuizForm } from './quizForm';
import { QuizContainer } from './../../../models/QuizContainer';
import * as quizService from '../../../services/QuizService'
import { QuizFormModel } from '../../../models/QuizFormModel';
import { WorkspaceContext } from './../../../contexts/WorkspaceContext';
import { QuestionForm } from './questionForm';

export const CreateQuiz: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const { webId } = useContext(WorkspaceContext);
	const [quizContainer, setQuizContainer] = useState<QuizContainer | null>(null);

	const quizSubmitted = (quizFormModel: QuizFormModel) => {
		//TODO: check quiz exists with workspace service
		//TODO: multi lang title, and resource name generation?? 

		setQuizContainer(quizService.createQuizContainer(quizFormModel.quizTitle, quizFormModel.multiLang, webId));
	}

	const content = quizContainer === null ? <QuizForm afterFormSubmit={quizSubmitted} /> : <QuestionForm />

	return (
		<>
			<h3 className='main-title'>{t("createQuiz.title")}</h3>
			{content}
			<Button className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}