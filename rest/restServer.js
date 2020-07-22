const http = require('http');
const fs = require('fs');

const users = {};

http.createServer((req, res)=>{

    if(req.method === 'GET'){
        //GET 부분 시작
        if(req.url === '/') {
            return fs.readFile('restFront.html', (err, data)=>{
               if(err){
                   throw err;
               }
               res.end(data);
            }); // /
        } else if(req.url === '/about') {
            return fs.readFile('about.html', (err, data)=>{
                if(err){
                    throw err;
                }
                res.end(data);
            }); //about
        } else if(req.url==='/users') {
            return res.end(JSON.stringify(users));
        } //users
        //위의 세 경로 중 아무것도 해당 안 될 시 but 받은 경로 자체는 있으면 아래 띄워주기
        return fs.readFile(`.${req.url}`, (err, data)=>{
            if(err){
                res.writeHead(404, 'NOT FOUND');
                return res.end('NOT FOUND');
            }
            return res.end(data);
        });
        //GET 부분 끝
        //POST 시작
    } else if(req.method==='POST') {
        if(req.url === '/users') {
            let body = '';
            req.on('data', (data) => {
               body += data;
            }); //users
            return req.on('end', () => {
                console.log('POST 본문(Body):', body);
                const {name} = JSON.parse(body);
                const id = Date.now();
                users[id] = name;
                res.writeHead(201);
                res.end('성공');
            });
        }
        //POST 부분 끝
        //PUT 시작
    } else if(req.method==='PUT'){
        if(req.url.startsWith('/users/')) {
            const key = req.url.split('/')[2];
            let body = '';
            req.on('data', (data)=>{
                body+=data;
            });
            return req.on('end', ()=>{
                console.log('PUT 본문(Body)');
                users[key] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        } // /users/
        //PUT끝
        //DELETE시작
    } else if(req.method==='DELETE'){
        if(req.url.startsWith('/users/')) {
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    }
    res.writeHead(404, 'NOT FOUND');
    return res.end('NOT FOUND');
}) // createServer End
    .listen(8085, ()=>{
        console.log("port 8085!");
    });