import { ErrorBoundary } from 'solid-js';
import { AppProvider } from '@app/context';
import Main from '@app/screens/Main';

const App = () => {
  return (
    <AppProvider>
      <ErrorBoundary fallback={<p>Fatal error</p>}>
        <Main />
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
