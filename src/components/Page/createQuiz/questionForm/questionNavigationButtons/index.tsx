import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import * as questionCreateModelValidator from '../../../../../helpers/QuestionCreateModelValidator'
import { QuestionCreationContext } from '../../../../../contexts/QuestionCreationContext';

export const QuestionNavigationButtons: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { questionNumber, isCrurrentQuestionCreatedYet } = useContext(QuestionCreationContext);
	const [alert, setAlert] = useState<string | null>(null);

	const onPrevClick = () => {
		if (questionNumber === 1) {
			return;
		}

		props.onPrev();
	}

	const onNextClick = () => {
		const error = questionCreateModelValidator.validateModel(props.questionModel);
		if (error !== null) {
			setAlert(t(error)); 
			return;
		}
		
		setAlert(null);

		if (isCrurrentQuestionCreatedYet()) {
			props.onNextNew();
		}
		else{
			props.onNext();
		}
	}

	return (
		<>
			<Row className='question-btn-row'>
				<Col>
					<Button variant="secondary" size='lg' className='question-btn' onClick={onPrevClick}>{t("createQuiz.question.prevQuestion")}</Button>
				</Col>
				<Col>
					<Button variant="secondary" size='lg' className='question-btn' onClick={onNextClick}>{t("createQuiz.question.nextQuestion")}</Button>
				</Col>
			</Row>
			{alert !== null && 
			<Row className='alert-row'><Alert variant='danger'>{alert}</Alert></Row>}
		</>
	);
}