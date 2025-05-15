const logToServer = require('./logger');
logToServer('message g');
const path = require('path');
var pathobj = path.parse(__filename);
console.log(pathobj);
///////////////////////////////////////////////
const os = require('os');
var freeMemory= os.freemem();
var totalMemory= os.totalmem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
/////////////////////////////////////////////////////////
const fs = require('fs');
const files =fs.readdirSync('./')
console.log(files);

fs.readdir('$', function (err, files) {
    if (err)
        console.log('Error', err);
    else
        console.log('Result', files);
});

/////////////////////////////////////////////////
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('messageLogged', (e) => {
    console.log('listener is called', e);
});
emitter.emit('messageLogged', { id: 1, url: 'http://' })
//emit is like making a noise or produce or signalling somthing is happening


////////////////////////////////////////////////////////////////////////////////////////
const Logger =require('./logger');
const logger = new Logger();
logger.on('messageLogged',(e)=>{
    console.log('listener called', e);
});
logger.log('message')

const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.write("hello worlds");
        res.end();
    }
    if (req.url === 'api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
server.listen(3000);
console.log('listening on port 3000 ...')
///////////////////////////////////////////////////////////////////////////