import { LoginButton } from '@inrupt/solid-ui-react';
import React, { useState } from 'react';
import { APP_NAME } from '../../constants/DefaultValues';
import { Providers } from './Providers';
import { Props } from './types';
import './styles.css';

export const Authenticate: React.FC<Props> = (props: Props) => {
    const authOptions = {
        clientName: APP_NAME,
      };

    const [oidcIssuer, setOidcIssuer] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOidcIssuer(event.target.value);
    };

	return (
        <div className="container square-box d-flex flex-column text-center">
            <h1>Solid quiz login page</h1>
            <div className="container px-4 inner-box">
                <p>Choose a provider and log in to your pod!</p> 
                <div className='row mt-3'>
                    <div className='col'>
                        <input
                            className="inner-box-dropDown"
                            type="text"
                            name="oidcIssuer"
                            list="providers"
                            value={oidcIssuer}
                            onChange={handleChange}
                        />
                        <Providers id="providers" />
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col'>
                        <LoginButton
                            oidcIssuer={oidcIssuer}
                            redirectUrl={window.location.href}
                            authOptions={authOptions}
                        />
                    </div>
                </div> 
            </div>               
        </div>
	);
}