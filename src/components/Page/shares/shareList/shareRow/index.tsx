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
import { removeSharing } from '../../../../../helpers/ShareLinksHelper';
import { useSession } from '@inrupt/solid-ui-react';
import { InfoModal } from '../../../../common/infoModal';
import { SpinnerContext } from '../../../../../contexts/SpinnerContext';

export const ShareRow: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { t, lang } = useContext(TranslateContext);	
	const { SpinAround } = useContext(SpinnerContext);
	const [isQuizShare, setIsQuizShare] = useState<boolean | null>(null);
	const [created, setCreated] = useState("");
	const [showInfoModal, setShowInfoModal] = useState(false);
	
	useEffect(() => {
		const typeUri = getUrl(props.shareLinkModel.shareThing, SOLIDQUIZ.sharedResourceType.value) ?? "error";
		
		if (typeUri === SOLIDQUIZ.Quiz.value) {
			setIsQuizShare(true);
		}
		else if (typeUri === SOLIDQUIZ.QuizResult.value) {
			setIsQuizShare(false);
		}
		else{
			console.log("Error, typeUri is not recognizable" + typeUri)
		}

		const actCreated = getDatetime(props.shareLinkModel.shareThing, SHARE_CREATED) ?? "error";
		setCreated(actCreated.toLocaleString(lang));

	}, [props.shareLinkModel.shareThing, lang]);

	const onRemove = () => {
		SpinAround(async () => {
			await removeSharing(props.shareLinkModel, session.fetch);

			setShowInfoModal(true);
		});	
	}

	const onInfoHide = () => {
		setShowInfoModal(false);
		props.setSyncState(act => act + 1);
	}

	return (
		<>
			{(isQuizShare !== null) &&
			<Row className='row-style'>
				<Col md="4">
					<p>{isQuizShare ? t("shares.list.typeQuiz") : t("shares.list.typeQuizResult")}</p>
				</Col>
				
				<ShareTypeSpecific shareThing={props.shareLinkModel.shareThing} isQuizShare={isQuizShare} />

				<Col md="3">
					<p>{created}</p>
				</Col>
				<Col md="1">
					<CloseButtonYesNo modalText={t("shares.list.modal.text")} onConfirm={onRemove} />				
				</Col>
			</Row>}

			<InfoModal show={showInfoModal} onHide={onInfoHide} body={t("shares.list.modal.shareOk")} />
		</>
	);
}