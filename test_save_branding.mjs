import { Client } from 'ssh2';

const conn = new Client();

conn.on('ready', () => {
  conn.exec(`
    curl -i -X POST http://127.0.0.1:3005/api/save-branding -H "Content-Type: application/json" -d '{"name":"Test Lumina","theme":"rose","logoUrl":""}'
    echo ""
    cat /var/www/html/lumina/branding.json
    echo ""
    journalctl -u lumina-branding.service -n 20 --no-pager
  `, (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('data', (d) => { out += d; });
    stream.on('close', () => {
      console.log('Testing /api/save-branding output:\n' + out);
      conn.end();
    });
  });
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
