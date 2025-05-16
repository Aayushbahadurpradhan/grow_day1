const path = require('path');
const { spawn } = require('child_process');
function runEventLoop() {
  const scriptPath = path.join(__dirname, '../logger.js');
  const child = spawn('node', [scriptPath], {
    stdio: 'inherit',
  });
  child.on('exit', (code) => {
    console.log(`Event loop demo exited with code ${code}`);
  });
}
module.exports = runEventLoop;
