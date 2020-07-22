process.on('uncaughtException', (err)=>{
    console.error('ucerr', err);
});

setInterval(()=>{
    throw new Error('error!!!');
}, 1000);

setTimeout(()=>{
    console.log('process');
});