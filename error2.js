const fs = require('fs');

setInterval(()=>{
   fs.unlink('resource/abcdefg.js', (err)=>{
       if(err){
           console.error(err);
       }
   })
}, 1000);