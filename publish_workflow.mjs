import { Client } from 'ssh2';
const conn = new Client();
conn.on('ready', () => {
  conn.exec('docker exec n8n-n8n-1 n8n publish:workflow --id=jozxvG23TzJkG3l3UAyIR', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      console.log('publish output:\n' + out);
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
