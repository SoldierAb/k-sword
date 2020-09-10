const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json') ;
const rollupTypescript = require('rollup-plugin-typescript2');

const path = require('path');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify').uglify;
const pkg = require('./package.json');

const exposeName = 'V';

module.exports = {
  input: path.resolve(__dirname, './src/index.ts'),
  plugins: [
    resolve({jsnext: true, preferBuiltins: false, browser: true}),
    rollupTypescript(),
    json(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      extensions:['.js', '.ts'],
    }),
    uglify()
  ],
  output:  {
    name: exposeName,
    format: 'umd',
    sourcemap:false,
    file: path.resolve(__dirname, pkg.main),
  }
}
