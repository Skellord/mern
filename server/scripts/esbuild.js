/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');
const copyStaticFiles = require('esbuild-copy-static-files');

esbuild.build({
    entryPoints: ['.//src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node12.19.0',
    minify: true,
    outfile: '/build/index.js',
    plugins: [
        copyStaticFiles({
            src: './/src/public',
            dest: './build/public',
            dereference: true,
            errorOnExist: false,
            preserveTimestamps: true,
            recursive: true,
        }),
    ],
});
