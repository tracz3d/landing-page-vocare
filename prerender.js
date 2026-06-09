// Pré-renderização estática (SSG): injeta o HTML do App no index.html após o build.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const templatePath = toAbsolute('dist/index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

const { render } = await import('./dist-ssr/entry-server.js');
const appHtml = render();

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: marcador <div id="root"></div> nao encontrado no index.html');
}

const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
fs.writeFileSync(templatePath, html);
console.log('SSG: dist/index.html pre-renderizado (' + appHtml.length + ' chars de HTML).');

// Limpa o bundle de SSR (nao precisa ir para producao)
fs.rmSync(toAbsolute('dist-ssr'), { recursive: true, force: true });
