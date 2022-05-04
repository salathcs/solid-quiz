import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { CloseButton, Col, Row } from 'react-bootstrap';
import { AnswerInput } from '../../../../../../common/quiz/answerInput';
import { ToggleBtnCheck } from '../../../../../../common/quiz/toggleBtnCheck';

export const QuestionAnswer: React.FC<Props> = (props: Props) => {	

	const handleOnCloseClick = () => {
		if (props.onCloseAnswer !== undefined) {
			props.onCloseAnswer(props.answerId);
		}
	}

	return (
		<Row>
			<Col md="1" className='check-button-style'>
				<ToggleBtnCheck value={props.answerId} defaultChecked={props.answerId === "0"} onChange={() => {}} disabled={true} />
			</Col>
			<Col md="10">
				<AnswerInput label={props.label} /> 
			</Col>
			<Col md="1" className='close-button-style'>
				<CloseButton onClick={handleOnCloseClick} disabled={props.onCloseAnswer === undefined} />
			</Col>
		</Row>
	);
}