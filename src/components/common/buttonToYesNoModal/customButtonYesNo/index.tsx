import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button } from 'react-bootstrap';
import { YesNoModal } from '../yesNoModal';

export const CustomButtonYesNo: React.FC<Props> = (props: Props) => {
	const [modalShow, setModalShow] = useState(false);

	const handleConfirm = () => {
		setModalShow(false);
		props.onConfirm();
	};

	return (
		<>
			<Button variant={props.variant} onClick={() => setModalShow(true)}>
				{props.children}
			</Button>
	
			<YesNoModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				body={props.modalText}
				onConfirm={handleConfirm}
			/>
		</>
	);
}