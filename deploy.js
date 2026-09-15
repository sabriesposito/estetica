import { Client } from 'ssh2';
import { readFileSync } from 'fs';
import { join } from 'path';

const conn = new Client();

conn.on('ready', () => {
  console.log('Client :: ready');
  
  // Diagnóstico post-reinicio de Nginx y config de Traefik
  conn.exec('systemctl status nginx && ss -tulpn && cat /etc/easypanel/traefik/config/main.yaml', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
