import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { CloseButton } from 'react-bootstrap';
import { YesNoModal } from '../yesNoModal';

export const CloseButtonYesNo: React.FC<Props> = (props: Props) => {
	const [modalShow, setModalShow] = useState(false);

	const handleConfirm = () => {
		setModalShow(false);
		props.onConfirm();
	};

	return (
		<>
			<CloseButton onClick={() => setModalShow(true)} />
	
			<YesNoModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				body={props.modalText}
				onConfirm={handleConfirm}
			/>
		</>
	);
}