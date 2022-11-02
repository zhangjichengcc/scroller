/*
 * @Author: zhangjicheng
 * @Date: 2022-10-18 17:30:58
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-11-02 18:37:22
 * @FilePath: \scroller.js\rollup.config.ts
 */
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs'; // 将commonjs转es6模块
import filesize from 'rollup-plugin-filesize'; // 显示打包后包大小
import { terser } from 'rollup-plugin-terser';  // 压缩代码
import { eslint } from 'rollup-plugin-eslint';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';
import packageJSON from './package.json';

const { TERSER, ENV } = process.env;

const plugins: RollupOptions['plugins'] = [
  typescript(),
  commonjs({
    include: ['node_modules/**']
  }),
  babel({
    exclude: 'node_modules/**' // 只编译我们的源代码
  }),
  filesize(),
  TERSER ? terser() : null,
  eslint({
    throwOnError: true,
    include: ['src/**/*.ts'],
    exclude: ['node_modules/**', 'lib/**']
  }),
]


export default {
  input: 'src/main.ts',
  // external: file => {
  //   return /rollup.config.ts/.test(file)
  // },
  output: [
    {
      file: packageJSON.main,
      format: "cjs",
      exports: "auto",
      sourcemap: ENV !== 'development',
    },
    {
      file: packageJSON.module,
      format: "esm",
      exports: "auto",
      sourcemap: ENV !== 'development',
    },
    {
      file: packageJSON['umd:main'],
      format: "umd",
      exports: "auto",
      name: "Scroller",
      sourcemap: ENV !== 'development',
    },
  ],
  plugins,
  // external: ['tween-functions']
} as RollupOptions;