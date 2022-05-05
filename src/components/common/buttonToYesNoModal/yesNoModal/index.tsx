import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Modal } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';

export const YesNoModal: React.FC<Props> = (props: Props) => {	
	const { t } = useContext(TranslateContext);

	return (
		<> 
			<Modal show={props.show} onHide={props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>{t("page.common.yesno.title")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.body}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.onHide}>{t("page.common.yesno.refuse")}</Button>
					<Button variant="primary" onClick={props.onConfirm}>{t("page.common.yesno.accept")}</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}