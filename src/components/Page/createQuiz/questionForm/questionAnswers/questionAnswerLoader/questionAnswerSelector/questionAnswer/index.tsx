import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { CloseButton, Col, Row } from 'react-bootstrap';
import { AnswerInput } from '../../../../../../../common/quizModification/answerInput';
import { ToggleBtnCheck } from '../../../../../../../common/quizModification/toggleBtnCheck';

export const QuestionAnswer: React.FC<Props> = (props: Props) => {	

	const handleOnCloseClick = () => {
		if (props.onCloseAnswer !== undefined) {
			props.onCloseAnswer(props.answerId);
		}
	}

	return (
		<Row>
			<Col md="1" className='check-button-style'>
				<ToggleBtnCheck value={props.answerId} defaultChecked={props.answerId === props.correctAnswerId.toString()} onChange={() => {}} disabled={true} />
			</Col>
			<Col md="10">
				<AnswerInput label={props.label} onChange={props.onChange} defaultValue={props.defaultValue} /> 
			</Col>
			<Col md="1" className='close-button-style'>
				<CloseButton onClick={handleOnCloseClick} disabled={props.onCloseAnswer === undefined} />
			</Col>
		</Row>
	);
}