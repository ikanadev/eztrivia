import { Component, createEffect, createSignal } from 'solid-js';

interface Props {
  reset: boolean
  setReset: (value: boolean) => void
  seconds: number
}
const Counter: Component<Props> = (props) => {
  const [counter, setCounter] = createSignal(0);
  const decrement = () => {
    if (counter() === 0) return;
    setCounter(prev => prev - 1);
  };
  let interval: NodeJS.Timer;

  createEffect(() => {
    if (props.reset) {
      setCounter(props.seconds);
      clearInterval(interval);
      interval = setInterval(decrement, 1000);
      props.setReset(false);
    }
  });

  createEffect(() => {
    if (props.seconds > 0) setCounter(props.seconds);
  });

  return (
    <div class="h-1 rounded-1 bg-bg overflow-hidden">
      <div
        class="h-1 rounded-1 bg-prim-base"
        style={{ width: `${(counter() * 100) / props.seconds}%` }}
      />
    </div>
  );
};

export default Counter;
