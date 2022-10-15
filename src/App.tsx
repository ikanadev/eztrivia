import { AppProvider } from '@app/context';
import Main from '@app/screens/Main';

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
