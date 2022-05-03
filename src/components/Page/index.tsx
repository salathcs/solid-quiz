import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Container } from 'react-bootstrap';
import { TranslateContext } from '../../contexts/TranslateContext';
import { PageSwitcherComponent } from '../common/pageSwitcherComponent';
import { MainMenu } from './mainMenu';
import { WorkspaceContextComponent } from './../common/workspaceContextComponent/index';

export const Page: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

  const getDefaultPage = () => <MainMenu />;

	return (
    <Container className='square-box d-flex flex-column text-center'>
      <Container className='px-4 inner-box'>
        <WorkspaceContextComponent>
          <h1>{t("page.title")}</h1>
          <PageSwitcherComponent defaultPage={getDefaultPage()} />
        </WorkspaceContextComponent>
      </Container>
    </Container>
	);
}