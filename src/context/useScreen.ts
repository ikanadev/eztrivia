import { createSignal } from 'solid-js';
import { Screen } from '@app/utils/types';

const useScreen = () => {
  const [screen, setScreen] = createSignal<Screen>(Screen.Home);

  return { screen, setScreen };
};

export default useScreen;
