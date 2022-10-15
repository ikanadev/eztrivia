import { Switch, Match } from 'solid-js';
import { ColorModeButton } from '@app/comps';
import Home from './Home';
import Questions from './Questions';

import { useState } from '@app/context';
import { Screen } from '@app/utils/types';

const Main = () => {
  const { state } = useState();
  return (
    <div class="container mx-a color-neutral-8 dark:color-neutral-1 relative">
      <div class="absolute top-2 right-3">
        <ColorModeButton />
      </div>
      <Switch>
        <Match when={state.screen() === Screen.Home}>
          <Home />
        </Match>
        <Match when={state.screen() === Screen.Questions}>
          <Questions />
        </Match>
      </Switch>
    </div>
  );
};

export default Main;
