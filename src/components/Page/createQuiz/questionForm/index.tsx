import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Container } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { QuestionAnswers } from './questionAnswers';
import { QuestionCreateModel } from '../../../../models/QuestionCreateModel';
import { QuestionCreationContext } from '../../../../contexts/QuestionCreationContext';
import { QuestionNavigationButtons } from './questionNavigationButtons';
import { QuestionTextLoader } from './questionTextLoader';
import * as questionService from '../../../../services/QuestionService';

export const QuestionForm: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const { questionNumber, setQuestionNumber, answerNumber, setAnswerNumber, 
			getQuizContainer, isCrurrentQuestionCreatedYet, isNextQuestionNew } = useContext(QuestionCreationContext);
	const [questionModel, setQuestionModel] = useState<QuestionCreateModel>(
			{ questionNumber: questionNumber, 
				textEn: "", 
				textHu: "", 
				answerOptions: [{answerId: "1", textEn: "", textHu: ""},
								{answerId: "2", textEn: "", textHu: ""}], 
				correctAnswerId: "1", 
				multiLang: props.multiLang, 
				lang }
	);
	const [titleCreateOrModify, setTitleCreateOrModify] = useState(t("createQuiz.question.titleCreate"));

	useEffect(() => {
		if (props.questionCreateModel !== undefined) {
			setQuestionModel(props.questionCreateModel);
		}
	}, [props.questionCreateModel]);

	const setToNewEmptyForm = () => {
		setQuestionModel({ 
			questionNumber: questionNumber + 1, 
			textEn: "", 
			textHu: "", 
			answerOptions: [ {answerId: answerNumber.toString(), textEn: "", textHu: ""},
							 {answerId: (answerNumber + 1).toString(), textEn: "", textHu: ""}
		 	], 
			correctAnswerId: answerNumber.toString(), 
			multiLang: props.multiLang, 
			lang 
		});

		setQuestionNumber(act => act + 1);
		setAnswerNumber(act => act + 2);			//increase to the next available (after the 2 def)	
		setTitleCreateOrModify(t("createQuiz.question.titleCreate"));
	}

	const onPrev = () => {
		if (!isCrurrentQuestionCreatedYet()) {
			props.questionSubmitted(questionModel);
		}

		const prevQuestionModel = questionService.getQuestionContainer(questionNumber - 1, getQuizContainer()).questionModel;
		setQuestionModel(prevQuestionModel);

		setQuestionNumber(act => act - 1);
		setTitleCreateOrModify(t("createQuiz.question.titleModify"));
	}

	const onNext = () => {
		props.questionSubmitted(questionModel);

		if (isNextQuestionNew()) {
			setToNewEmptyForm();
		}
		else{
			const nextQuestionModel = questionService.getQuestionContainer(questionNumber + 1, getQuizContainer()).questionModel;
			setQuestionModel(nextQuestionModel);

			setQuestionNumber(act => act + 1);
			setTitleCreateOrModify(t("createQuiz.question.titleModify"));
		}
	}

	const onNextNew = () => {
		props.questionSubmitted(questionModel);

		setToNewEmptyForm();		
	}

	const handleClickFinish = () => {
		props.finishQuiz();
	}

	return (
		<Container className="justify-content-md-center">
			<h3 className='main-title'>{questionNumber.toString()}. {titleCreateOrModify}</h3>

			<QuestionTextLoader questionModel={questionModel} onChange={setQuestionModel} />
			<QuestionAnswers questionModel={questionModel} onChange={setQuestionModel} /> 

			<QuestionNavigationButtons questionModel={questionModel} onPrev={onPrev} onNext={onNext} onNextNew={onNextNew} onFinishClick={handleClickFinish} />
		</Container>
	);
}