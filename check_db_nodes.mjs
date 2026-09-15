import { Client } from 'ssh2';
import { writeFileSync } from 'fs';

const conn = new Client();
conn.on('ready', () => {
  conn.exec('docker exec n8n-postgres-1 psql -U n8n -d n8n -t -c "SELECT nodes FROM workflow_entity WHERE id=\'jozxvG23TzJkG3l3UAyIR\';"', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      writeFileSync('./db_nodes.json', out.trim());
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
