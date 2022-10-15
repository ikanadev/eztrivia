import { createSignal, createEffect, onMount } from 'solid-js';
import { ColorMode } from '@app/utils/types';
import { COLOR_MODE } from '@app/utils/constants';

const colorMode = () => {
  const [color, setColor] = createSignal<ColorMode>(ColorMode.Light);

  onMount(() => {
    const mode = localStorage.getItem(COLOR_MODE);
    if (mode === null) return;
    setColor(mode as ColorMode);
  });

  createEffect(() => {
    localStorage.setItem(COLOR_MODE, color());
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    if (html === null || body === null) return;
    if (color() === ColorMode.Dark) {
      // mx-a dark:bg-dark-8 bg-light-1">
      html.classList.add('dark');
      body.classList.add('bg-dark-8');
      body.classList.remove('bg-light-1');
    } else {
      html.classList.remove('dark');
      body.classList.add('bg-light-1');
      body.classList.remove('bg-dark-8');
    }
  });

  const toggle = () => {
    setColor(prev => {
      if (prev === ColorMode.Dark) return ColorMode.Light;
      return ColorMode.Dark;
    });
  };

  return { color, toggle };
};

export default colorMode;
