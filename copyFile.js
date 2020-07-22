const fs = require('fs');

fs.copyFile('/resource/readme4.txt', '/resource/writeme4.txt', (error)=>{
    if(error){
        return console.error(error);
    }
    console.log("복사 완료");
})