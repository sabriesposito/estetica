import { Client } from 'ssh2';

const conn = new Client();

const CONFIG = `server {
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

conn.on('ready', () => {
  conn.exec(`
    rm -f /etc/nginx/sites-enabled/lumina.conf
    echo '${CONFIG}' > /etc/nginx/sites-available/lumina
    ln -sf /etc/nginx/sites-available/lumina /etc/nginx/sites-enabled/lumina
    nginx -t && systemctl restart nginx
    echo "--- TESTING CURL POST /api/save-branding ---"
    curl -i -X POST http://127.0.0.1:3005/api/save-branding -H "Content-Type: application/json" -d '{"name":"Lumina Estética","description":"Tu santuario de belleza","theme":"rose","logoUrl":""}'
  `, (err, stream) => {
    if (err) throw err;
    let out = '';
    stream.on('data', (d) => { out += d; });
    stream.on('close', () => {
      console.log('Fix Nginx Output:\n' + out);
      conn.end();
    });
  });
}).connect({
  host: '72.61.24.118',
  port: 22,
  username: 'root',
  password: `b)m)U#,x9Uz3v'8);9R6`
});
