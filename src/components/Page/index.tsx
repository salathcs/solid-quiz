import React from 'react';
import { Props } from './types';
import './styles.css';

export const Page: React.FC<Props> = (props: Props) => {


	return (
	<div className="container">
      <div className="row">
        <div className="col">
          <p>Kezdjük</p>
        </div>
        <div className="col">
          <p>oszlop 2</p>
        </div>
      </div>
    </div>
	);
}