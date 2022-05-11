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
    <TranslateContextComponent>
      <SpinnerContextComponent>
        {appContent}
      </SpinnerContextComponent>
    </TranslateContextComponent>
  );
}

export default App;
