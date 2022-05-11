import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Modal } from 'react-bootstrap';
import { TranslateContext } from '../../../contexts/TranslateContext';

export const InfoModal: React.FC<Props> = (props: Props) => {	
	const { t } = useContext(TranslateContext);

	return (
		<> 
			<Modal show={props.show} onHide={props.onHide} centered>
				<Modal.Header closeButton>
					<Modal.Title>{t("page.common.info.title")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.body}
				</Modal.Body>
				<Modal.Footer className='justify-content-center'>
					<Button variant="primary" onClick={() => props.onHide()}>{t("page.common.info.btnOk")}</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}