import { Client } from 'ssh2';
const conn = new Client();
conn.on('ready', () => {
  conn.exec('docker exec n8n-postgres-1 psql -U n8n -d n8n -c "SELECT id, \\"workflowId\\", status, \\"startedAt\\", \\"stoppedAt\\" FROM execution_entity WHERE \\"workflowId\\"=\'jozxvG23TzJkG3l3UAyIR\' ORDER BY id DESC LIMIT 1;"', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      console.log('Latest execution:\n' + out);
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
