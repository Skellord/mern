/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');
const copyStaticFiles = require('esbuild-copy-static-files');
const path = require('path');

esbuild.build({
    entryPoints: [path.join(__dirname, '../src/index.ts')],
    bundle: true,
    platform: 'node',
    target: 'node16.14.0',
    minify: true,
    outfile: path.join(__dirname, '../build/index.js'),
    plugins: [
        copyStaticFiles({
            src: path.join(__dirname, '../src/public'),
            dest: path.join(__dirname, '../build/public'),
            dereference: true,
            errorOnExist: false,
            preserveTimestamps: true,
            recursive: true,
        }),
    ],
});
