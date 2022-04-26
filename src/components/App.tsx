import { useSession } from '@inrupt/solid-ui-react';
import './App.css';
import { Authenticate } from './Auth';
import { Page } from './Page';
import { SpinnerContextComponent } from './SpinnerContextComponent';

function App() {
  const { session } = useSession();

  const appContent = session.info.isLoggedIn ? <Page /> : <Authenticate />;

  return (
    <SpinnerContextComponent>
      {appContent}
    </SpinnerContextComponent>
  );
}

export default App;
