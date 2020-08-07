const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV }=process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

module.exports=()=>{
    const connect=()=>{
        if(NODE_ENV !== 'production'){
            mongoose.set('debug', true);
        }
        mongoose.connect(MONGO_URL, {
            dbName: 'nodeplace',
        }, (error)=>{
            if(error) {
                console.log('몽고디비 연결에러', error);
            } else {
                console.log('몽고디비 연결성공');
            }
        });
    }

    connect();

    mongoose.connection.on('error', (error)=> {
        console.error('몽고디비 연결에러', error);
    });

    mongoose.connection.on('disconnected', ()=>{
        console.error('연결 끊김 연결을 재시도합니다.');
        connect();
    });

    require('./favorite');
    require('./history');
};
