// const WebSocket = require('ws');
const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, {path:'/socket.io'});

    //컨넥션 리스너 호출
    io.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwared-for'] || req.connection.remoteAddress;

        console.log("new client ", ip, socket.id, req.ip);

        socket.on("disconnect", ()=>{
            console.log("client disconnect ", ip, socket.id);
            clearInterval(socket.interval);
        });

        socket.on('error', (error) => {
            console.error(error);
        });

        socket.on('reply', (data)=>{
            console.log(data);
        });

        const interval = setInterval(() => {
            socket.emit('news', 'Hello Socket IO');
        }, 3000);
        socket.interval = interval;
    });
};

// module.exports = (server) => {
//     const wss = new WebSocket.Server({server});
//
//     //컨넥션 리스너 호출
//     wss.on('connection', (ws, req) => {
//         const ip = req.headers['x-forwared-for'] || req.connection.remoteAddress;
//
//         console.log("new client ", ip);
//         ws.on('message', (message) => {
//             console.log(message);
//         });
//
//         ws.on('error', (error) => {
//             console.error(error);
//         });
//
//         ws.on('close', () => {
//             console.log('client off ', ip);
//             clearInterval(ws.interval);
//         });
//         const interval = setInterval(() => {
//             if(ws.readyState === ws.OPEN) {
//                 ws.send('서버에서 클라이언트로 메시지 전송');
//             }
//         }, 3000);
//         ws.interval = interval;
//     });
// };