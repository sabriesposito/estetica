import { Client } from 'ssh2';
const conn = new Client();
conn.on('ready', () => {
  conn.exec('grep -A 10 "custom-cml4jawtm000607p0919u8l2z" /etc/easypanel/traefik/config/main.yaml', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      console.log('service target:\n' + out);
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
