import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = createServer(async (req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  try {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    let filePath = '.' + urlObj.pathname;
    if (filePath === './') {
      filePath = './index.html';
    }

    // Security check to avoid directory traversal
    filePath = join(process.cwd(), filePath);
    if (!filePath.startsWith(process.cwd())) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const content = await readFile(filePath);
    const ext = String(extname(filePath)).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(500);
      res.end('Server error: ' + error.code);
    }
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor local iniciado correctamente.`);
  console.log(`🌐 Abre tu navegador en: http://localhost:${PORT}`);
});
