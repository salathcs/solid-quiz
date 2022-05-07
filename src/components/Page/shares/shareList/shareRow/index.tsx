import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Row, Col } from 'react-bootstrap';
import { CloseButtonYesNo } from '../../../../common/buttonToYesNoModal/closeButtonYesNo';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { getDatetime, getUrl } from '@inrupt/solid-client';
import SOLIDQUIZ from './../../../../../helpers/SOLIDQUIZ';
import { ShareTypeSpecific } from './shareTypeSpecific';
import { SHARE_CREATED } from '../../../../../constants/SolidQuizMissingValues';

export const ShareRow: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);	
	const [isQuizShare, setIsQuizShare] = useState<boolean | null>(null);
	const [created, setCreated] = useState("");
	
	useEffect(() => {
		const typeUri = getUrl(props.shareThing, SOLIDQUIZ.sharedResourceType.value) ?? "error";
		
		if (typeUri === SOLIDQUIZ.Quiz.value) {
			setIsQuizShare(true);
		}
		else if (typeUri === SOLIDQUIZ.QuizResult.value) {
			setIsQuizShare(false);
		}
		else{
			console.log("Error, typeUri is not recognizable" + typeUri)
		}

		const actCreated = getDatetime(props.shareThing, SHARE_CREATED) ?? "error";
		setCreated(actCreated.toLocaleString(lang));

	}, [props.shareThing, lang]);

	const onRemove = () => {

	}

	return (
		<>
			{(isQuizShare !== null) &&
			<Row className='row-style'>
				<Col md="4">
					<p>{isQuizShare ? t("shares.list.typeQuiz") : t("shares.list.typeQuizResult")}</p>
				</Col>
				
				<ShareTypeSpecific shareThing={props.shareThing} isQuizShare={isQuizShare} />

				<Col md="3">
					<p>{created}</p>
				</Col>
				<Col md="1">
					<CloseButtonYesNo modalText={t("shares.list.modal.text")} onConfirm={onRemove} />				
				</Col>
			</Row>}
		</>
	);
}