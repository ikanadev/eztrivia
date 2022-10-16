import { Button } from '@app/comps';
import { Dota2 } from '@app/icons';

import { useState } from '@app/context';
import { Screen } from '@app/utils/types';

const Home = () => {
  const { actions: { setScreen } } = useState();
  return (
    <main>
      <div class="flex flex-col min-h-screen">
        <div class="grow-3 basis-0 flex items-end justify-center color-bg">
          <Dota2 />
        </div>
        <div class="grow-2 basis-0 flex flex-col items-center text-xl">
          <h1
            class={[
              'text-7xl text-prim font-bold mb-4',
            ].join(' ')}
          >
            EZTrivia
          </h1>
          <p class="text-center mb-2">So you think you know a lot about Dota2?</p>
          <p>Let's find out!</p>
        </div>
        <div class="grow-3 basis-0 flex items-start justify-center">
          <Button onClick={[setScreen, Screen.Questions]}>
            <span>Start</span>
            <div class="i-ion-arrow-forward inline-block ml-1" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
