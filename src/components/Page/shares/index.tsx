import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Button } from 'react-bootstrap';
import { WorkspaceContext } from '../../../contexts/WorkspaceContext';
import { useSession } from '@inrupt/solid-ui-react';
import { getAllShareThingByShareLink } from '../../../helpers/ShareLinksHelper';
import { SpinnerContext } from '../../../contexts/SpinnerContext';
import { ShareList } from './shareList';
import { ShareLinkModel } from '../../../models/ShareLinkModel';

export const Shares: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const { workspaceUrl } = useContext(WorkspaceContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [shareLinkModels, setShareLinkModels] = useState<ShareLinkModel[]>([]);
	const [syncState, setSyncState] = useState(0);

	useEffect(() => {
		SpinAround(async () => {
			const actShareLinkModels = await getAllShareThingByShareLink(workspaceUrl, session.fetch);

			setShareLinkModels(actShareLinkModels);
		});	
	}, [workspaceUrl, session.fetch, SpinAround, syncState]);
	
	return (
		<>
			<h3 className='main-title'>{t("shares.title")}</h3>

			<ShareList shareLinkModels={shareLinkModels} setSyncState={setSyncState} /> 

			<Button className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}