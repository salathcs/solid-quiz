import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';

export const QuizShareModal: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

	return (
		<>
			<Modal show={props.show} onHide={props.onHide} centered>
				<Modal.Header closeButton>
					<Modal.Title>{t("modifyQuiz.modal.share.title")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				{t("modifyQuiz.modal.share.text")}
				</Modal.Body>
				<Modal.Footer>
					<Container>
						<Row>
							<Col>
								<Button variant="primary" className='btn-style' onClick={props.onHide}>{t("modifyQuiz.modal.share.share")}</Button>
							</Col>
							<Col>
								<Button variant="primary" className='btn-style' onClick={props.onConfirm}>{t("modifyQuiz.modal.share.publish")}</Button>
							</Col>
						</Row>
					</Container>
				</Modal.Footer>
			</Modal>
		</>
	);
}