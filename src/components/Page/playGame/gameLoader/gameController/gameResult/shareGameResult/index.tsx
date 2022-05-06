import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Row, Button, Col, Alert } from 'react-bootstrap';
import { IoMdShare } from "@react-icons/all-files/io/IoMdShare";
import * as sharesService from '../../../../../../../services/SharesService';
import { SpinnerContext } from '../../../../../../../contexts/SpinnerContext';
import { TranslateContext } from '../../../../../../../contexts/TranslateContext';
import { useSession } from '@inrupt/solid-ui-react';
import { getSolidDataset, getThing } from '@inrupt/solid-client';

export const ShareGameResult: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { SpinAround } = useContext(SpinnerContext);
	const { session } = useSession();
	const [shared, setShared] = useState(false);

	const onPublish = () => {
		SpinAround(async () => {
			//TODO: ez nem jó... vagy jöjjön hamarabbról (updatedDataset emgvan controlleren), vagy teljesen ki kell fejteni...
			const dataset = await getSolidDataset(props.quizResultThing.url, { fetch: session.fetch });
			const thing =  getThing(dataset, props.quizResultThing.url);

			await sharesService.publishQuizResult(thing?.url ?? "error");

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
					<Alert>{t("playGame.gameResult.shareComplete")}</Alert>}
				</Col>
			</Row>
		</>
	);
}