import aliasPlugin from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import autoExternal from 'rollup-plugin-auto-external';
import bundleSize from 'rollup-plugin-bundle-size';
import { terser } from 'rollup-plugin-terser';
import { fileURLToPath } from 'url';

const lib = require('./package.json');
const outputFileName = 'moobius-api-sdk';
const name = 'moobiusSdk';
const namedInput = './src/index.ts';
const defaultInput = './src/index.ts';

const buildConfig = ({
  es5,
  browser = true,
  minifiedVersion = true,
  alias,
  ...config
}) => {
  const { file } = config.output;
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  const extArr = ext.split('.');
  extArr.shift();

  const build = ({ minified }) => ({
    input: namedInput,
    ...config,
    output: {
      ...config.output,
      file: `${path.dirname(file)}/${basename}.${(minified ? ['min', ...extArr] : extArr).join('.')}`,
    },
    plugins: [
      aliasPlugin({
        entries: [
          {
            find: '@',
            replacement: path.resolve(
              path.dirname(fileURLToPath(import.meta.url)),
              'src',
            ),
          },
          ...(alias || []),
        ],
      }),
      typescript({ tsconfig: './tsconfig.json' }),
      json(),
      resolve({ browser }),
      commonjs(),

      minified && terser(),
      minified && bundleSize(),
      ...(es5
        ? [
            babel({
              babelHelpers: 'bundled',
              presets: ['@babel/preset-env'],
            }),
          ]
        : []),

      ...(config.plugins || []),
    ],
  });

  const configs = [build({ minified: false })];

  if (minifiedVersion) {
    configs.push(build({ minified: true }));
  }

  return configs;
};

export default async () => {
  const year = new Date().getFullYear();
  const banner = `// Moobius-js-api-sdk v${lib.version} Copyright (c) ${year} ${lib.author} and contributors`;

  return [
    // browser ESM bundle for CDN
    ...buildConfig({
      input: namedInput,
      output: {
        file: `dist/esm/${outputFileName}.js`,
        format: 'esm',
        preferConst: true,
        exports: 'named',
        banner,
      },
    }),
    ...buildConfig({
      input: defaultInput,
      es5: true,
      output: {
        file: `dist/${outputFileName}.js`,
        name,
        format: 'umd',
        exports: 'default',
        banner,
      },
    }),
    // Node.js commonjs bundle
    {
      input: defaultInput,
      output: {
        file: `dist/node/${outputFileName}.cjs`,
        format: 'cjs',
        preferConst: true,
        exports: 'default',
        banner,
      },
      plugins: [
        typescript({ tsconfig: './tsconfig.json' }),
        autoExternal(),
        resolve(),
        commonjs(),
      ],
    },
  ];
};
