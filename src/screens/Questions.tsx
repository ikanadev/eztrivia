import { createSignal, createEffect, For, Show, on } from 'solid-js';
import { Button, Counter } from '@app/comps';
import { Question } from '@app/utils/types';

import { useState } from '@app/context';

const getQuestion = (): Question => {
  return {
    // imgUrl: 'img/skills/abaddon_aphotic_shield.png',
    imgUrl: 'img/heroes/abaddon.png',
    question: 'What is the name of this ability? and some random text to make this question larger?',
    options: ['Mana burn', 'Black hole', 'Aphotic Shield', 'Mistic Flare'],
    correctIndex: 2,
  };
};

const SECONDS = 5;

const Questions = () => {
  const [counterReset, setCounterReset] = createSignal(true);
  const [nro, setNro] = createSignal(1);
  const [answer, setAnswer] = createSignal<number | null>(null);

  const [question, setQuestion] = createSignal<Question>(getQuestion());
  const { state } = useState();
  let questionTimer: NodeJS.Timeout;

  createEffect(() => {
    console.log(state.heroes.length);
  });
  createEffect(on(nro, (n) => {
    clearTimeout(questionTimer);
    questionTimer = setTimeout(() => handleAnswer(5), SECONDS * 1000);
  }));

  const handleNextQuestion = () => {
    if (answer() === null) return;
    if (question().correctIndex === answer()) {
      console.log('OK');
    }
    setAnswer(null);
    setCounterReset(true);
    setNro(prev => prev + 1);
    setQuestion(getQuestion());
  };
  const handleAnswer = (index: number) => {
    if (answer() !== null) return;
    setAnswer(index);
  };

  return (
    <main>
      <div class="flex flex-col px-2">
        <div class="mt-4 md:mt-20 flex justify-center">
          <div class="flex flex-col max-w-md flex-1">
            <div class="self-stretch mb-6">
              <Counter seconds={SECONDS} reset={counterReset()} setReset={setCounterReset} />
            </div>
            <div class="rounded-3 overflow-hidden self-center">
              <img src={question().imgUrl} />
            </div>
            <p class="text-sm mt-8">{`${nro()} of 10`}</p>
            <h3 class="text-2xl font-500 mb-4">
              {question().question}
            </h3>
            <div class="pt-1 pb-4 md:pb-10" />

            <div class="flex flex-col gap-3 items-stretch">
              <For each={question().options}>{(option, index) => (
                <Button
                  // eslint-disable-next-line solid/reactivity
                  onClick={[handleAnswer, index()]}
                  variant={
                    (question().correctIndex === answer() && answer() === index()) ||
                      (answer() !== null && index() === question().correctIndex)
                      ? 'success'
                      : answer() !== null && answer() === index()
                        ? 'error'
                        : 'primary'
                  }
                >
                  <p>{option}</p>
                </Button>
              )}</For>
            </div>

            <Show when={answer() !== null}>
              <div class="flex justify-end mt-4">
                <Button onClick={handleNextQuestion}>
                  Next
                </Button>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Questions;
