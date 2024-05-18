import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'index.js', // Entry point for your library
  output: [
    {
      file: pkg.main,    // Output for CommonJS (Node.js) environments
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,  // Output for ES module environments
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'next/headers'],  // Treat react, react-dom, and next/headers as external dependencies
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'] // Add .jsx to extensions
    }),
    babel({
      exclude: 'node_modules/**', // Only transpile our source code
      babelHelpers: 'bundled',    // Specify the babel helper method to use
      extensions: ['.js', '.jsx'], // Ensure Babel processes JSX files
      presets: ['@babel/preset-env', '@babel/preset-react'] // Ensure presets are included
    }),
    commonjs(),   // Converts CommonJS modules to ES6
    terser(),     // Minify the output
  ],
};
