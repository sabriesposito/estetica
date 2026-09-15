import { Client } from 'ssh2';
const conn = new Client();
conn.on('ready', () => {
  conn.exec('docker exec n8n-n8n-1 node -e "fetch(\'https://estetica.neco-dev.cloud/branding.json\').then(r=>r.json()).then(d=>console.log(\'ownerEmail from n8n container:\', d.ownerEmail)).catch(console.error);"', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      console.log('Result in container:\n' + out);
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
