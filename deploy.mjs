import { Client } from 'ssh2';
import { join } from 'path';

const conn = new Client();

const CONFIG_TRAEFIK_LUMINA = `{
  "http": {
    "routers": {
      "http-lumina": {
        "service": "lumina-service",
        "rule": "Host(\`estetica.neco-dev.cloud\`) && PathPrefix(\`/\`)",
        "priority": 10,
        "middlewares": ["redirect-to-https"],
        "entryPoints": ["http"]
      },
      "https-lumina": {
        "service": "lumina-service",
        "rule": "Host(\`estetica.neco-dev.cloud\`) && PathPrefix(\`/\`)",
        "priority": 10,
        "middlewares": [],
        "tls": {
          "certResolver": "letsencrypt",
          "domains": [
            { "main": "estetica.neco-dev.cloud" }
          ]
        },
        "entryPoints": ["https"]
      }
    },
    "services": {
      "lumina-service": {
        "loadBalancer": {
          "servers": [
            { "url": "http://72.61.24.118:3005", "weight": 1 }
          ],
          "passHostHeader": true
        }
      }
    }
  }
}`;

const CONFIG_NGINX_LUMINA = `server {
    listen 3005;
    server_name localhost;
    root /var/www/html/lumina;
    index index.html;

    client_max_body_size 15M;

    location /api/save-branding {
        proxy_pass http://127.0.0.1:3006;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ =404;
    }
}`;

const SERVICE_LUMINA_BRANDING = `[Unit]
Description=Lumina Branding Microservice
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/html/lumina
ExecStart=/usr/local/bin/node /var/www/html/lumina/server.mjs
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
`;

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

conn.on('ready', async () => {
  console.log('SSH connection established');
  try {
    console.log('Creating remote directory...');
    await execCommand('mkdir -p /var/www/html/lumina');
    await execCommand('rm -f /var/www/html/lumina/agendapro.html');

    const sftp = await getSFTP();
    const filesToUpload = ['index.html', 'reserva.html', 'server.mjs', 'spa_background.jpg'];
    
    for (const file of filesToUpload) {
      const localPath = join(process.cwd(), file);
      const remotePath = `/var/www/html/lumina/${file}`;
      console.log(`Uploading ${file}...`);
      await sftpUpload(sftp, localPath, remotePath);
      console.log(`Uploaded ${file} successfully`);
    }

    console.log('Updating Systemd service for Branding API...');
    await execCommand(`echo '${SERVICE_LUMINA_BRANDING}' > /etc/systemd/system/lumina-branding.service`);
    await execCommand('systemctl daemon-reload && systemctl enable lumina-branding && systemctl restart lumina-branding');

    console.log('Updating Nginx lumina site config...');
    await execCommand(`rm -f /etc/nginx/sites-enabled/lumina.conf && echo '${CONFIG_NGINX_LUMINA}' > /etc/nginx/sites-available/lumina && ln -sf /etc/nginx/sites-available/lumina /etc/nginx/sites-enabled/lumina`);

    console.log('Updating Traefik config...');
    await execCommand(`echo '${CONFIG_TRAEFIK_LUMINA}' > /etc/easypanel/traefik/config/lumina.yaml`);

    console.log('Restarting Nginx...');
    const res = await execCommand('nginx -t && systemctl restart nginx');
    console.log('Nginx status code:', res.code);
    
    console.log('🚀 Despliegue completado con éxito!');
  } catch (e) {
    console.error('Error en el despliegue:', e);
  } finally {
    conn.end();
  }
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
