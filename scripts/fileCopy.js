/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');

const src = path.join(__dirname, '../src/public');
const dest = path.join(__dirname, '../build/public');

fs.copy(src, dest, err => {
    if (err) {
        console.log('An error occurred while copying the folder');
        return console.error(err);
    }
    console.log('Copy complete');
});
