import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  conn.exec('cat /var/www/html/lumina/branding.json; echo ""; systemctl status lumina-branding --no-pager; curl -s http://127.0.0.1:3005/branding.json', (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('data', (d) => { out += d; });
    stream.on('close', () => {
      console.log('VPS branding.json & status:\n' + out);
      conn.end();
    });
  });
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
