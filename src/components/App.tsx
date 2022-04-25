import { useSession } from '@inrupt/solid-ui-react';
import './App.css';
import { Authenticate } from './Auth';
import { Page } from './Page';
import { SpinnerContextComponent } from './SpinnerContextComponent';

function App() {
  const { session } = useSession();

  if (!session.info.isLoggedIn){
    return (
      <SpinnerContextComponent>
        <Authenticate />
      </SpinnerContextComponent>
    );
  }
  
  return (
    <SpinnerContextComponent>
      <Page />
    </SpinnerContextComponent>
  );
}

export default App;
