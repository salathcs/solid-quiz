import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { QuizShareModalBody } from './quizShareModalBody';

export const QuizShareModal: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

	return (
		<>
			<Modal show={props.show} onHide={props.onHide} centered>
				<Modal.Header closeButton>
					<Modal.Title>{t("shareQuiz.modal.share.title")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							{t("shareQuiz.modal.share.text")}
						</Row>
						<QuizShareModalBody friendList={props.friendList} setSelected={setSelectedPerson} />
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" className='btn-style' onClick={props.onHide}>{t("shareQuiz.modal.share.cancel")}</Button>
					<Button 
						variant="primary" 
						className='btn-style' 
						onClick={() => props.onConfirm(selectedPerson ?? "error")} 
						disabled={selectedPerson === null}>
							{t("shareQuiz.modal.share.share")}
						</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}