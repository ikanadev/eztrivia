import { Button } from '@app/comps';

import { useState } from '@app/context';
import { getPoinsDesc } from '@app/utils/functions';

const EndScreen = () => {
  const { state, actions: { reset } } = useState();

  const getReaction = () => {
    switch (true) {
      case state.points() < 3:
        return 'Sadly';
      case state.points() >= 3 && state.points() <= 5:
        return 'Mmm...';
      case state.points() >= 6 && state.points() <= 8:
        return 'Holy smokes,';
      case state.points() >= 9:
        return 'Wonderful,';
      default:
        return '';
    }
  };

  return (
    <main>
      <div class="flex justify-center px-2 mt-8 md:mt-20 text-lg">
        <div class="flex flex-col max-w-md flex-1">
          <p>{`${getReaction()} you got:`}</p>
          <p
            classList={{
              'self-center font-700 py-4 text-9xl -my-6': true,
              'text-red-6': state.points() < 3,
              'text-orange-5': state.points() >= 3 && state.points() <= 5,
              'text-teal-6': state.points() >= 6 && state.points() <= 8,
              'text-green-7': state.points() >= 9,
            }}
          >
            {state.points}
          </p>
          <p class="text-right mb-10">correct answers!</p>
          <div class="flex items-start mt-2">
            <div class="i-mdi-robot mr-2 text-3xl" />
            <p>{getPoinsDesc(state.points())}</p>
          </div>
          <div class="flex justify-center mt-8">
            <Button onClick={reset}>
              <span>Retry</span>
              <div class="i-ion-refresh inline-block ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EndScreen;
