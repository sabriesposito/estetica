import { Client } from 'ssh2';
const conn = new Client();
conn.on('ready', () => {
  conn.exec('grep -rn "n8n.neco-dev.cloud" /etc/easypanel/traefik/config/ 2>&1 || docker exec easypanel-traefik.1.rnywu33qpnrxouuprf8m32607 cat /etc/traefik/traefik.yml', (err, stream) => {
    let out = '';
    stream.on('data', d => out += d);
    stream.on('close', () => {
      console.log('Traefik routing for n8n:\n' + out);
      conn.end();
    });
  });
}).connect({ host: '72.61.24.118', port: 22, username: 'root', password: `b)m)U#,x9Uz3v'8);9R6` });
