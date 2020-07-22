const fs = require('fs');

const readStream = fs.createReadStream('resource/readme4.txt');
const writeStream = fs.createWriteStream('resource/writeme3.txt');
readStream.pipe(writeStream);