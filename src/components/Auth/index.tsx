import { LoginButton } from '@inrupt/solid-ui-react';
import React, { useContext, useState } from 'react';
import { APP_NAME } from '../../constants/DefaultValues';
import { Props } from './types';
import { Providers } from './providers';
import './styles.scoped.css';
import { TranslateContext } from '../../contexts/TranslateContext';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';

export const Authenticate: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

    const authOptions = {
        clientName: APP_NAME,
      };

    const [oidcIssuer, setOidcIssuer] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOidcIssuer(event.target.value);
    };

    return (
        <Container className='square-box d-flex flex-column text-center'>
            <h1>{t("auth.title")}</h1>
            <Container className='px-4 inner-box'>
                <p>{t("auth.label")}</p>
                <Row className='mt-3'>
                    <Col>
                        <input
                            className="inner-box-dropDown"
                            type="text"
                            name="oidcIssuer"
                            list="providers"
                            value={oidcIssuer}
                            onChange={handleChange}
                        />
                        <Providers id="providers" />
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <LoginButton
                            oidcIssuer={oidcIssuer}
                            redirectUrl={window.location.href}
                            authOptions={authOptions}
                        >
                            <Button variant="primary" size='lg' className='login-btn'>{t("auth.button.login")}</Button>
                        </LoginButton>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Alert>{t("auth.button.note")}</Alert>
                </Row>
            </Container>
        </Container>
    );
}