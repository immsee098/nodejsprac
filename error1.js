setInterval(()=>{
    console.log("시작");

    try{
        throw new Error("error1!!!");
    } catch(err){
        console.error(err);
    }
}, 1000);