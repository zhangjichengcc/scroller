/*
 * @Author: zhangjicheng
 * @Date: 2022-10-18 17:30:58
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-19 15:36:40
 * @FilePath: \scroller.js\rollup.config.ts
 */
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve'; // 帮助rollup查找外部模块
import commonjs from '@rollup/plugin-commonjs'; // 将commonjs转es6模块
import filesize from 'rollup-plugin-filesize'; // 显示打包后包大小
import { terser } from 'rollup-plugin-terser';  // 压缩代码
import { eslint } from 'rollup-plugin-eslint';
import ts from 'rollup-plugin-typescript2';
// import path from 'path';
import packageJSON from './package.json';

const { TERSER } = process.env;

const plugins = [
  babel({
    exclude: 'node_modules/**' // 只编译我们的源代码
  }),
  resolve({
    mainFields: ['main', 'module', 'browser'],
    extensions: ['.js', '.tx', '.json'],
  }),
  commonjs({
    include: ['node_modules/**']
  }),
  filesize(),
  TERSER ? terser() : '',
  eslint({
    throwOnError: true,
    include: ['src/**/*.ts'],
    exclude: ['node_modules/**', 'lib/**']
  }),
  ts(),
]


export default {
  input: 'src/main.ts',
  output: [
    {
      file: packageJSON.main,
      format: "cjs",
      exports: "auto",
    },
    {
      file: packageJSON.module,
      format: "esm",
      exports: "auto",
    },
  ],
  plugins,
};