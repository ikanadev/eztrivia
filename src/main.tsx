import { render } from 'solid-js/web';

import App from './App';

render(
  () => <App />,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector('#app')!,
);
