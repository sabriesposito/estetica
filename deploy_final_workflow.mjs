import { Client } from 'ssh2';
import { readFileSync } from 'fs';

const conn = new Client();

function execCommand(cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';
      stream.on('data', d => stdout += d);
      stream.stderr.on('data', d => stderr += d);
      stream.on('close', code => resolve({ code, stdout, stderr }));
    });
  });
}

function sftpUpload(sftp, local, remote) {
  return new Promise((resolve, reject) => {
    sftp.fastPut(local, remote, err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

conn.on('ready', async () => {
  console.log('SSH connection established');
  try {
    const sftp = await new Promise((res, rej) => conn.sftp((e, s) => e ? rej(e) : res(s)));
    console.log('Uploading final_robust_workflow.json to VPS...');
    await sftpUpload(sftp, './final_robust_workflow.json', '/tmp/final_robust_workflow.json');

    console.log('Copying into n8n container...');
    await execCommand('docker cp /tmp/final_robust_workflow.json n8n-n8n-1:/tmp/final_robust_workflow.json');

    console.log('Importing workflow via n8n CLI...');
    const importRes = await execCommand('docker exec n8n-n8n-1 n8n import:workflow --input=/tmp/final_robust_workflow.json');
    console.log('Import result:', importRes.stdout);

    console.log('Activating workflow...');
    const actRes = await execCommand('docker exec n8n-n8n-1 n8n update:workflow --id=jozxvG23TzJkG3l3UAyIR --active=true');
    console.log('Activate result:', actRes.stdout);

    console.log('Restarting n8n container...');
    await execCommand('docker restart n8n-n8n-1');
    console.log('Restart complete!');
  } catch(e) {
    console.error('Error in deployment:', e);
  } finally {
    conn.end();
  }
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
