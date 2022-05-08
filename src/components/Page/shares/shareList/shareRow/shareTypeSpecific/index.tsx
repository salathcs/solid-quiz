import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Col } from 'react-bootstrap';
import { useSession } from '@inrupt/solid-ui-react';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { SpinnerContext } from '../../../../../../contexts/SpinnerContext';
import { fetchQuizTitle, fetchQuizTitleFromResult } from '../../../../../../helpers/ShareLinksHelper';
import { getUrl } from '@inrupt/solid-client';
import SOLIDQUIZ from './../../../../../../helpers/SOLIDQUIZ';

export const ShareTypeSpecific: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { lang } = useContext(TranslateContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [title, setTitle] = useState("");
	
	useEffect(() => {
		SpinAround(async () => {
			const resourceUri = getUrl(props.shareThing, SOLIDQUIZ.sharedResource.value) ?? "error";
			let actTitle: string = "";

			if (props.isQuizShare) {
				actTitle = await fetchQuizTitle(resourceUri, lang, session.fetch);
			}
			else{
				actTitle = await fetchQuizTitleFromResult(resourceUri, lang, session.fetch);
			}

			setTitle(actTitle);
		});	
	}, [session.fetch, SpinAround, lang, props.isQuizShare, props.shareThing]);

	return (
		<>
			<Col md="3">				
				<p>{title}</p>
			</Col>
		</>
	);
}