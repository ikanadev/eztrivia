import { createContext, useContext, ParentComponent } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Screen, AppState, AppContextState, Hero } from '@app/utils/types';
import useScreen from './useScreen';

const getEmptyState = (): AppState => ({
  screen: () => Screen.Home,
  heroes: [],
});

const AppContext = createContext<AppContextState>({
  state: getEmptyState(),
  actions: {
    setScreen: () => undefined,
    setHeroes: () => undefined,
  },
});

export const AppProvider: ParentComponent = (props) => {
  const { screen, setScreen } = useScreen();
  const [heroes, setHeroes] = createStore<Hero[]>([]);

  return (
    <AppContext.Provider
      value={{
        state: {
          screen,
          heroes,
        },
        actions: {
          setScreen,
          setHeroes,
        },
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useState = () => useContext(AppContext);
