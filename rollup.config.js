import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-cpy';
import scss from 'rollup-plugin-scss'
import pkg from './package.json';

export default {
    input: './src/source/editor.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
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
        scss({
            output: 'dist/style.css',
        }),
        copy([
            { files: 'src/images/*.*', dest: './dist/images' },
          ])
    ],
};
