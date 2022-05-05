import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Row, Col, Button } from 'react-bootstrap';
import { QuizBtn } from './quizBtn';
import { IoMdShare } from "@react-icons/all-files/io/IoMdShare";
import { CloseButtonYesNo } from '../../../../common/buttonToYesNoModal/closeButtonYesNo';
import { TranslateContext } from '../../../../../contexts/TranslateContext';

export const QuizRow: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

	return (
		<Row>
			<Col md="1" className='share-button-style'>
				<Button variant='light'><IoMdShare /></Button>
			</Col>
			<Col md="10" className='content-style'>
				<QuizBtn quizThing={props.quizThing} />
			</Col>
			<Col md="1" className='close-button-style'>
				<CloseButtonYesNo modalText={t("page.common.yesno.confirmDeleteText")} onConfirm={() => {}} />
			</Col>
		</Row>
	);
}