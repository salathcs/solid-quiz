import React from 'react';
import { Props } from './types';
import './styles.css';
import { SOLID_PROVIDERS } from '../../../constants/SolidProviders';

export const Providers: React.FC<Props> = (props: Props) => {
    const providers = SOLID_PROVIDERS.map((provider) => 
        <option key={provider} value={provider}/>
    );

	return (
        <datalist id={props.id}>
            {providers}
        </datalist>
	);
}