const fs = require('fs');

fs.writeFile('resource/writeme.txt', 'write', (err)=>{
    if(err){
        throw err;
    }
    fs.readFile('resource/writeme.txt', (err, data)=>{
        if(err){
            throw err;
        }
        console.log(data.toString());
    });
});