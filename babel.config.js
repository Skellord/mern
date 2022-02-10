module.exports = {
    presets: [['@babel/env', { targets: { node: 'current' } }], ['@babel/preset-typescript'], ['minify']],
    // plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
};
