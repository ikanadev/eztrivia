import { Accessor } from 'solid-js';

export enum Screen {
  Home = 'Home',
  Questions = 'Questions',
  Final = 'Final',
}
export enum ColorMode {
  Light = 'light',
  Dark = 'dark',
}

// app store
export interface AppState {
  screen: Accessor<Screen>
  colorMode: Accessor<ColorMode>
}
export interface AppActions {
  toggleColorMode: () => void
  setScreen: (screen: Screen) => void
}

export interface AppContextState {
  state: AppState
  actions: AppActions
}
