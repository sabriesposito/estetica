import { Client } from 'ssh2';
import { writeFileSync } from 'fs';

const conn = new Client();
conn.on('error', e => console.error(e.message));
conn.on('ready', () => {
  conn.exec('docker exec n8n-postgres-1 psql -U n8n -d n8n -c "SELECT \\"data\\" FROM execution_data WHERE \\"executionId\\"=14449;"', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      writeFileSync('./exec_14449.txt', out);
      console.log('Saved exec_14449.txt, length:', out.length);
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
