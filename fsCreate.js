const fs = require('fs');

fs.access('folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) =>
{
    if(err){
        if(err.code === 'ENOENT') {
            console.log('폴더 없음');
            fs.mkdir('resource/folder', (err)=>{
                if(err){
                    throw err;
                }
                console.log('폴더 만들기 성공');
                fs.open("resource/folder/file.js", 'w', (err, fd)=>{
                    if(err){
                        throw err;
                    }
                    console.log("빈 파일 만들기 성공", fd);
                    fs.rename('resource/folder/file.js', 'resource/folder/newfile.js', (err)=>{
                        if(err){
                            throw err;
                        }
                        console.log("name changed");
                    });
                });
            });
        } else {
            throw err;
        }
    } else {
        console.log("already folder");
    }
});