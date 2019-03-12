import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-cpy';
import uglify from 'rollup-plugin-uglify-es';
import cssnano from 'cssnano';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

import pkg from './package.json';

const isDevelopment = !!process.env.dev;
const sassCfg = { output: `${pkg.output}/style.min.css` };
const uglifyCfg = isDevelopment ? () => { } : uglify

if (isDevelopment) {
    sassCfg.processor = css => postcss([autoprefixer, cssnano])
        .process(css, { from: undefined })
        .then(result => result.css)
}

const params = {
    input: './src/source/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'iife',
            name: 'Editor',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        nodeResolve({
            jsnext: false,
            extensions: [ '.ts', '.js', '.json' ]
        }),
        typescript({
            typescript: require('typescript'),
        }),
        commonJS(),
        babel({
            exclude: 'node_modules/**'
        }),
        copy([
            { files: 'src/images/*.*', dest: `${pkg.output}/images` },
        ]),
        sass(sassCfg),
        uglifyCfg,
    ],
};


export default params;
