import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  conn.exec('cat /etc/nginx/conf.d/*.conf /etc/nginx/sites-enabled/* 2>/dev/null', (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('data', (d) => { out += d; });
    stream.on('close', () => {
      console.log('Nginx config on VPS:\n' + out);
      conn.end();
    });
  });
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
