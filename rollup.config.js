import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/teddy-card.js',
  output: {
    file: 'dist/teddy-card.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    terser()
  ]
};