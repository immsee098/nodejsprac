const util = require('util');
const crypto = require('crypto');

const dontUse = util.deprecate((x, y)=>{
    console.log(x + y);
}, "this is deprecated");

dontUse(1,2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)

    .then((buf) => {
        salt = buf.toString('base64');
        console.log();
    })
    .catch((error) => {
        console.error(error);
    });