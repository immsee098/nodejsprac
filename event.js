const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', ()=>{
    console.log('event1');
});
myEvent.on('event1', ()=>{
    console.log("event1 추가");
});

myEvent.emit('event1');

myEvent.once('event2', ()=>{
    console.log("event2");
});

myEvent.emit('event2');
myEvent.emit('event2');

myEvent.removeAllListeners('event1');
myEvent.emit('event1');

const listener=()=>{
    console.log('event5');
};

myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event');

myEvent.once('event6', ()=>{
    console.log("event6");
});

console.log(myEvent.listenerCount('event6'));