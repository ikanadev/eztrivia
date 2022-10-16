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
      safelist: 'bg-bg'.split(' '),
      presets: [
        presetWind(),
        presetIcons(),
      ],
      theme: {
        colors: {
          bg: '#100018',
          prim: {
            base: '#2a6395',
            light: '#5b80a3',
            lighter: '#c7e5fd',
          },
        },
      },
    }),
  ],
  server: {
    port: 3030,
  },
  build: {
    target: 'esnext',
  },
});
