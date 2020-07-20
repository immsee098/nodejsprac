const crypto = require('crypto');

console.log('base64 : ',  crypto.createHash('sha512').update('password').digest('base64'));