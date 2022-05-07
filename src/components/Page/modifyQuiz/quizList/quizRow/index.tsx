import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Row, Col } from 'react-bootstrap';
import { QuizBtn } from './quizBtn';
import { CloseButtonYesNo } from '../../../../common/buttonToYesNoModal/closeButtonYesNo';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { QuizShare } from './quizShare';

export const QuizRow: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

	return (
		<Row>
			<Col md="1" className='share-button-style'>
				<QuizShare datasetAndThing={props.datasetAndThing} />
			</Col>
			<Col md="10" className='content-style'>
				<QuizBtn datasetAndThing={props.datasetAndThing} />
			</Col>
			<Col md="1" className='close-button-style'>
				<CloseButtonYesNo modalText={t("page.common.yesno.confirmDeleteText")} onConfirm={() => props.handleDelete(props.datasetAndThing)} />
			</Col>
		</Row>
	);
}