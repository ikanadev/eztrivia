import { render } from 'solid-js/web';

import './main.css';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

import App from './App';

render(
  () => <App />,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector('#app')!,
);
