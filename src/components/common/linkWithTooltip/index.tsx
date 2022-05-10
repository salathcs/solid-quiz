import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SpinnerContext } from './../../../contexts/SpinnerContext';
import { tryGetName } from '../../../helpers/ShareLinksHelper';

export const LinkWithTooltip: React.FC<Props> = ({href, tooltipText}) => {
	const { SpinAround } = useContext(SpinnerContext);
	const [name, setName] = useState("LINK");

	useEffect(() => {
		SpinAround(async () => {
			const name = await tryGetName(href);

			if (name !== null) {
				setName(name);
			}
		});
	}, [SpinAround, href]);
	
	const renderTooltip = (props: any) => (
		<Tooltip id="button-tooltip" {...props}>
		  {tooltipText}
		</Tooltip>
	  );
	  
	return (
		<OverlayTrigger
			placement="right"
			delay={{ show: 10, hide: 50 }}
			overlay={renderTooltip}
		>
			<Button href={href} target="_blank" rel="noopener noreferrer" variant='link'>{name}</Button>
		</OverlayTrigger>
	);
}