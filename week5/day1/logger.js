// const EventEmitter = require('events');
// var url = 'http://localhost:3000/logs';
// class Logger extends EventEmitter{
//     log(message) {
//     console.log(message);
//     this.emit('messageLogged', { id: 1, url: 'http://' })
// }
// }
// module.exports = Logger;



console.log('------Start of script-----');
setTimeout(() => {
  console.log('----------setTimeout----------');
}, 0);
setImmediate(() => {
  console.log('------------setImmediate------------------');
});
process.nextTick(() => {
  console.log('-------------process.nextTick-------------');
});
console.log('*************End of script*****************');
