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
import { Thing } from '@inrupt/solid-client';
import { ShareList } from './shareList';

export const Shares: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const { workspaceUrl } = useContext(WorkspaceContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [shareThings, setShareThings] = useState<Thing[]>([]);

	useEffect(() => {
		SpinAround(async () => {
			const actShareThings = await getAllShareThingByShareLink(workspaceUrl, session.fetch);

			setShareThings(actShareThings);
		});	
	}, [workspaceUrl, session.fetch, SpinAround]);
	
	return (
		<>
			<h3 className='main-title'>{t("shares.title")}</h3>

			<ShareList shareThings={shareThings} />

			<Button className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}