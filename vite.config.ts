import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint';
import UnoCss from 'unocss/vite';
import presetWind from '@unocss/preset-wind';
import presetIcons from '@unocss/preset-icons';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    solidPlugin(),
    eslint(),
    UnoCss({
      safelist: 'bg-dark-8 bg-light-1'.split(' '),
      presets: [
        presetWind(),
        presetIcons(),
      ],
    }),
  ],
  server: {
    port: 3030,
  },
  build: {
    target: 'esnext',
  },
});
