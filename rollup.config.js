import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-cpy';
import scss from 'rollup-plugin-scss'
import pkg from './package.json';

export default {
    input: './src/source/index.ts',
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
        babel({
            exclude: 'node_modules/**'
        }),
        scss({
            output: `${pkg.output}/style.css`,
        }),
        copy([
            { files: 'src/images/*.*', dest: `${pkg.output}/images` },
        ])
    ],
};
