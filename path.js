const path = require('path');

const string = __filename;

console.log("path.sep : ", path.sep);
console.log("path.basename() : ", path.basename(string));
console.log(process.env.PATH)