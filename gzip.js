const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('resource/readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('resource/readme.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);