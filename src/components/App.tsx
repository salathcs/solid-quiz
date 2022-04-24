import { useSession } from '@inrupt/solid-ui-react';
import './App.css';
import { Authenticate } from './Auth';
import { Page } from './Page';

function App() {
  const { session } = useSession();

  if (!session.info.isLoggedIn){
    return <Authenticate />;
  }
  
  return <Page />;
}

export default App;
