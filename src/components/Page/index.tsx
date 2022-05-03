import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Container } from 'react-bootstrap';
import { TranslateContext } from '../../contexts/TranslateContext';

export const Page: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

	return (
    <Container className='square-box d-flex flex-column text-center'>
      <Container className='px-4 inner-box'>
        <p>{t("auth.label")}</p>
      </Container>
    </Container>
	);
}