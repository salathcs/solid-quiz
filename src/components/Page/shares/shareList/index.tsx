import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Col, Container, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { ShareRow } from './shareRow';

export const ShareList: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);	
	const [elements, setElements] = useState<JSX.Element[]>([]);

	useEffect(() => {
		setElements(
			props.shareLinkModels.map((shareLinkModel, indx) => 
				<ShareRow key={indx} shareLinkModel={shareLinkModel} setSyncState={props.setSyncState}  />)
		);
	}, [props.shareLinkModels, props.setSyncState]);

	return (
		<Container>
			<Row className='row-style'>
				<Col md="2">
					{t("shares.listCol.type")}
				</Col>
				<Col md="3">
					{t("shares.listCol.title")}
				</Col>
				<Col md="3">
					{t("shares.listCol.shareType")}
				</Col>
				<Col md="3">
					{t("shares.listCol.created")}
				</Col>
			</Row>

			{elements}
		</Container>
	);
}