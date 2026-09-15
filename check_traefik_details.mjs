import { Client } from 'ssh2';
const conn = new Client();
conn.on('ready', () => {
  conn.exec('sed -n "160,200p" /etc/easypanel/traefik/config/main.yaml', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      console.log('main.yaml 160-200:\n' + out);
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
