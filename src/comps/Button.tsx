import { ParentComponent, JSX } from 'solid-js';

const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      class={[
        'px-5 py-2 flex items-center rounded-full',
        'font-500 text-lg',
        'bg-red-7 color-light-1',
        'hover:bg-pink-8',
      ].join(' ')}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
