import { createContext, useContext, ParentComponent, createSignal, Setter } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Screen, AppState, AppContextState, Hero } from '@app/utils/types';
import useScreen from './useScreen';

const getEmptyState = (): AppState => ({
  screen: () => Screen.Home,
  heroes: [],
  points: () => 0,
});

const AppContext = createContext<AppContextState>({
  state: getEmptyState(),
  actions: {
    setScreen: () => undefined,
    setHeroes: () => undefined,
    setPoints: (() => undefined) as Setter<number>,
  },
});

export const AppProvider: ParentComponent = (props) => {
  const [points, setPoints] = createSignal(0);
  const { screen, setScreen } = useScreen();
  const [heroes, setHeroes] = createStore<Hero[]>([]);

  return (
    <AppContext.Provider
      value={{
        state: {
          screen,
          heroes,
          points,
        },
        actions: {
          setScreen,
          setHeroes,
          setPoints,
        },
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useState = () => useContext(AppContext);
