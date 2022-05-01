import { useSession } from '@inrupt/solid-ui-react';
import './App.css';
import { Authenticate } from './auth';
import { SpinnerContextComponent } from './common/spinnerContextComponent';
import { TranslateContextComponent } from './common/translateContextComponent';
import { Page } from './page';

function App() {
  const { session } = useSession();

  const appContent = session.info.isLoggedIn ? <Page /> : <Authenticate />;

  return (
    <SpinnerContextComponent>
      <TranslateContextComponent>
        {appContent}
      </TranslateContextComponent>
    </SpinnerContextComponent>
  );
}

export default App;
