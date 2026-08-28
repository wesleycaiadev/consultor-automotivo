import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const host = '127.0.0.1';
const port = 4173;
const root = resolve('dist/mf-v3/browser');
const indexFile = join(root, 'index.csr.html');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
};

async function existingFile(pathname) {
  try {
    return (await stat(pathname)).isFile();
  } catch {
    return false;
  }
}

const server = createServer(async (request, response) => {
  const requestPath = new URL(request.url ?? '/', `http://${host}`).pathname;
  const safePath = normalize(requestPath).replace(/^[/\\]+/, '');
  const candidate = resolve(root, safePath);
  const insideRoot = candidate === root || candidate.startsWith(`${root}/`);
  const file = insideRoot && (await existingFile(candidate)) ? candidate : indexFile;

  await access(file);
  response.writeHead(200, {
    'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`E2E static server listening at http://${host}:${port}`);
});
