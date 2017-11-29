const { exec } = require('child_process');
console.log('running')


function gitPull() {
  exec('git pull')

  exec('pm2 restart server.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  })
}

module.exports = { gitPull }
