import { createContext, useContext, ParentComponent } from 'solid-js';

import { Screen, ColorMode, AppState, AppContextState } from '@app/utils/types';
import colorMode from './colorMode';
import useScreen from './useScreen';

const getEmptyState = (): AppState => ({
  screen: () => Screen.Home,
  colorMode: () => ColorMode.Light,
});

const AppContext = createContext<AppContextState>({
  state: getEmptyState(),
  actions: {
    toggleColorMode: () => undefined,
    setScreen: () => undefined,
  },
});

export const AppProvider: ParentComponent = (props) => {
  const { color, toggle } = colorMode();
  const { screen, setScreen } = useScreen();

  return (
    <AppContext.Provider
      value={{
        state: {
          screen,
          colorMode: color,
        },
        actions: {
          toggleColorMode: toggle,
          setScreen,
        },
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useState = () => useContext(AppContext);
