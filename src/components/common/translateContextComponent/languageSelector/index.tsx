import React, { useContext } from 'react';
import { Props } from './types';
import './styles.css';
import { Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';

export const LanguageSelector: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);	

	const selectedLangLabel = lang === "hu" ? t("lang.hungarian") : t("lang.english");

	return (
		<Container>
			<Row className="justify-content-end">
				<Col md="auto">
					<DropdownButton 
						id="dropdown-basic-button" 
						title={selectedLangLabel} 
						variant='outline-secondary' 
						onSelect={(eventKey: any, event: Object) => props.changeLang(eventKey)}
						className="language-selector">
						<Dropdown.Item eventKey="en">{t("lang.english")}</Dropdown.Item>
						<Dropdown.Item eventKey="hu">{t("lang.hungarian")}</Dropdown.Item>
					</DropdownButton>
				</Col>
			</Row>
		</Container>
	);
}