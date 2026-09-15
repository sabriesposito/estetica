import { Client } from 'ssh2';
const conn = new Client();
conn.on('ready', () => {
  conn.exec('grep -n -C 5 "ownerEmail" /var/www/html/lumina/index.html', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      console.log('grep ownerEmail in server index.html:\n' + out);
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
