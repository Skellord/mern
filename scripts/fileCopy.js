/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');

const src = path.join(__dirname, '../src/public');
const dest = path.join(__dirname, '../build/public');
const build = path.join(__dirname, '../build');

fs.removeSync(build, err => {
    if (err) {
        console.log('An error occurred while remove');
        return console.log(err);
    }
    console.log('Remove complete');
});

fs.copy(src, dest, err => {
    if (err) {
        console.log('An error occurred while copying the folder');
        return console.error(err);
    }
    console.log('Copy complete');
});
