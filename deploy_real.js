import { Client } from 'ssh2';
import { join } from 'path';

const conn = new Client();

const CONFIG_NGINX = `server {
    listen 3005;
    server_name localhost;
    root /var/www/html/lumina;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}`;

function execCommand(cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';
      stream.on('data', (data) => { stdout += data; });
      stream.stderr.on('data', (data) => { stderr += data; });
      stream.on('close', (code) => {
        resolve({ code, stdout, stderr });
      });
    });
  });
}

function getSFTP() {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      resolve(sftp);
    });
  });
}

function sftpUpload(sftp, local, remote) {
  return new Promise((resolve, reject) => {
    sftp.fastPut(local, remote, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function sftpWriteFile(sftp, remote, content) {
  return new Promise((resolve, reject) => {
    sftp.writeFile(remote, content, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

conn.on('ready', async () => {
  console.log('SSH connection established');
  try {
    // 1. Create directory on VPS
    console.log('Creating remote directory...');
    await execCommand('mkdir -p /var/www/html/lumina');
    console.log('Remote directory created');

    // 2. Open SFTP
    const sftp = await getSFTP();
    console.log('SFTP session opened');

    // 3. Upload files
    const filesToUpload = ['index.html', 'reserva.html', 'cancelar.html'];
    for (const file of filesToUpload) {
      const localPath = join(process.cwd(), file);
      const remotePath = `/var/www/html/lumina/${file}`;
      console.log(`Uploading ${file}...`);
      await sftpUpload(sftp, localPath, remotePath);
      console.log(`Uploaded ${file} successfully`);
    }

    // 4. Create Nginx config file
    console.log('Creating Nginx configuration...');
    await sftpWriteFile(sftp, '/etc/nginx/sites-available/lumina', CONFIG_NGINX);
    console.log('Nginx configuration created');

    // 5. Link, test and restart Nginx
    console.log('Enabling Nginx site and restarting...');
    const nginxRes = await execCommand('ln -sf /etc/nginx/sites-available/lumina /etc/nginx/sites-enabled/lumina && nginx -t && systemctl restart nginx');
    console.log(`Nginx restart code: ${nginxRes.code}`);
    console.log(`Nginx output:\n${nginxRes.stdout}\n${nginxRes.stderr}`);

    // 6. Read Traefik config
    console.log('Reading Traefik main.yaml...');
    const catRes = await execCommand('cat /etc/easypanel/traefik/config/main.yaml');
    if (catRes.code !== 0) {
      throw new Error(`Failed to read main.yaml: ${catRes.stderr}`);
    }

    const config = JSON.parse(catRes.stdout);
    console.log('Traefik main.yaml read and parsed');

    // Modify config
    config.http.routers["http-lumina"] = {
      "service": "lumina-service",
      "rule": "Host(`estetica.neco-dev.cloud`) && PathPrefix(`/`)",
      "priority": 0,
      "middlewares": ["redirect-to-https"],
      "entryPoints": ["http"]
    };
    
    config.http.routers["https-lumina"] = {
      "service": "lumina-service",
      "rule": "Host(`estetica.neco-dev.cloud`) && PathPrefix(`/`)",
      "priority": 0,
      "middlewares": [],
      "tls": {
        "certResolver": "letsencrypt",
        "domains": [
          { "main": "estetica.neco-dev.cloud" }
        ]
      },
      "entryPoints": ["https"]
    };
    
    config.http.services["lumina-service"] = {
      "loadBalancer": {
        "servers": [
          { "url": "http://72.61.24.118:3005", "weight": 1 }
        ],
        "passHostHeader": true
      }
    };

    const newYamlData = JSON.stringify(config, null, 2);

    // Write updated main.yaml back
    console.log('Writing updated Traefik main.yaml...');
    await sftpWriteFile(sftp, '/etc/easypanel/traefik/config/main.yaml', newYamlData);
    console.log('Traefik main.yaml updated successfully!');

    console.log('Deployment completed successfully!');
  } catch (e) {
    console.error('Deployment failed:', e);
  } finally {
    conn.end();
  }
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
