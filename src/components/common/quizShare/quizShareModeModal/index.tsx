import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';

export const QuizShareModeModal: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

	return (
		<>
			<Modal show={props.show} onHide={props.onHide} centered>
				<Modal.Header closeButton>
					<Modal.Title>{t("shareQuiz.modal.publish.title")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				{t("shareQuiz.modal.publish.text")}
				</Modal.Body>
				<Modal.Footer>
					<Container>
						<Row>
							<Col>
								<Button variant="primary" className='btn-style' onClick={() => props.onConfirm(false)}>{t("shareQuiz.modal.publish.share")}</Button>
							</Col>
							<Col>
								<Button variant="primary" className='btn-style' onClick={() => props.onConfirm(true)}>{t("shareQuiz.modal.publish.publish")}</Button>
							</Col>
						</Row>
					</Container>
				</Modal.Footer>
			</Modal>
		</>
	);
}