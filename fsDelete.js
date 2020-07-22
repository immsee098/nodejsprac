const fs = require('fs');

fs.readdir('resource/folder', (err, dir)=>{
    if(err){
        throw err;
    }
    console.log("폴더 내용 확인", dir);
    fs.unlink('resource/folder/newFile.js', (err)=>{
        if(err){
            throw err;
        }
        console.log("파일 삭제 성공");
        fs.rmdir('resource/folder', (err)=>{
            if(err){
                throw err;
            }
            console.log('폴더 삭제 성공');
        });
    });
});