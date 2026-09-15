import { Client } from 'ssh2';
import { writeFileSync } from 'fs';

const conn = new Client();

conn.on('ready', () => {
  conn.exec('docker exec n8n-n8n-1 node -e "console.log(process.version)"', (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('data', (d) => { out += d; });
    stream.on('close', () => {
      console.log('Node version in n8n container:\n' + out);
      conn.end();
    });
  });
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
