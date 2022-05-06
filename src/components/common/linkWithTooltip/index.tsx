import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export const LinkWithTooltip: React.FC<Props> = ({href, tooltipText}) => {
	
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
			<Button href={href} target="_blank" rel="noopener noreferrer" variant='link'>Link</Button>
		</OverlayTrigger>
	);
}