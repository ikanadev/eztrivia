import { ParentComponent, JSX, splitProps } from 'solid-js';

interface Props {
  variant?: 'success' | 'primary' | 'error'
}
const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement> & Props> = (props) => {
  const [extraProps, buttonProps] = splitProps(props, ['variant']);
  return (
    <button
      classList={{
        'px-5 py-2 flex items-center rounded-1 font-500 text-lg transition': true,
        'bg-prim-base color-blue-1': extraProps.variant === 'primary' || extraProps.variant === undefined,
        'bg-green-7 color-green-1': extraProps.variant === 'success',
        'bg-red-8 color-red-1': extraProps.variant === 'error',
      }}
      {...buttonProps}
    >
      {props.children}
    </button>
  );
};

export default Button;
