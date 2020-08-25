import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const path = require('path');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify').uglify;
const merge = require('lodash.merge');
const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

const pathResolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

const exposeName = 'K';

// 打包任务的个性化配置
const jobs = {
  esm: {
    output: {
      name: exposeName,
      file: pathResolve(pkg.module),
      format: 'esm',
      sourcemap:true,
    },
  },
  umd: {
    output: {
      name: exposeName,
      file: pathResolve(pkg.main),
      format: 'umd',
      sourcemap:true,
    },
  },
  min: {
    output: {
      name: exposeName,
      file: pathResolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      format: 'umd',
      sourcemap:false,
    },
    plugins: [uglify()],
  },
};

// 从环境变量获取打包特征
const mergeConfig = jobs[process.env.FORMAT || 'esm'];

const _conf = merge(
  {
    input: pathResolve('./src/index.ts'),
    plugins: [
      resolve({jsnext: true, preferBuiltins: false, browser: true}),
      typescript({
        exclude: 'node_modules/**',
        typescript: require('typescript'),
      }),
      json(),
      commonjs(),
      // resolve({
      //   browser:true,
      // }),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
    ],
  },
  mergeConfig,
);

module.exports = _conf
