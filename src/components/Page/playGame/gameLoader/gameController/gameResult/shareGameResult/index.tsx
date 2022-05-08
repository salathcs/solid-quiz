import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Row, Button, Col, Alert } from 'react-bootstrap';
import { IoMdShare } from "@react-icons/all-files/io/IoMdShare";
import { SpinnerContext } from '../../../../../../../contexts/SpinnerContext';
import { TranslateContext } from '../../../../../../../contexts/TranslateContext';
import { useSession } from '@inrupt/solid-ui-react';
import { handlePublishQuizResult } from '../../../../../../../helpers/SharesHelper';
import { WorkspaceContext } from '../../../../../../../contexts/WorkspaceContext';

export const ShareGameResult: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { SpinAround } = useContext(SpinnerContext);
	const { workspaceUrl, webId } = useContext(WorkspaceContext);
	const { session } = useSession();
	const [shared, setShared] = useState(false);

	const onPublish = () => {
		SpinAround(async () => {			
			await handlePublishQuizResult(webId, workspaceUrl, props.quizResultData, session.fetch);

			setShared(true);
		});	
	};

	return (
		<>
			<Row>
					<h3 className='share-title'>{t("playGame.gameResult.share")}</h3> 
			</Row>
			<Row>
				<Col>
					<Button className='share-btn' onClick={onPublish} disabled={shared}><IoMdShare /></Button>
					{shared &&
					<Alert className='share-alert'>{t("playGame.gameResult.shareComplete")}</Alert>}
				</Col>
			</Row>
		</>
	);
}