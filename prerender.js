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

let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// Inline do CSS local (Vite) para eliminar request render-blocking — melhora FCP/LCP.
// As fontes do Google continuam carregando de forma assíncrona (href https, não casa com ./).
html = html.replace(/<link\b[^>]*?href="\.\/([^"]+\.css)"[^>]*?>/g, (match, cssFile) => {
  try {
    const css = fs.readFileSync(toAbsolute('dist/' + cssFile), 'utf-8');
    return `<style>${css}</style>`;
  } catch {
    return match; // se não achar o arquivo, mantém o link original
  }
});

fs.writeFileSync(templatePath, html);
console.log('SSG: dist/index.html pre-renderizado (' + appHtml.length + ' chars) + CSS inline.');

// Limpa o bundle de SSR (nao precisa ir para producao)
fs.rmSync(toAbsolute('dist-ssr'), { recursive: true, force: true });
