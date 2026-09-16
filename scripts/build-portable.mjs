import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = path.join(root, 'dist/client');
const output = path.join(root, '../pipeline-presentation.html');
let html = await readFile(path.join(dist, 'index.html'), 'utf8');
const jsTag = html.match(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/);
const cssTag = html.match(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/);
if (!jsTag || !cssTag) throw new Error('Expected one built JS bundle and stylesheet.');
const localAsset = url => path.join(dist, url.replace(/^\//, ''));
let css = await readFile(localAsset(cssTag[1]), 'utf8');
for (const match of [...css.matchAll(/url\(([^)]+)\)/g)]) {
  const url = match[1].replace(/^["']|["']$/g, '');
  if (url.startsWith('data:')) continue;
  const assetPath = url.startsWith('/')
    ? localAsset(url)
    : path.resolve(path.dirname(localAsset(cssTag[1])), url);
  const bytes = await readFile(assetPath);
  const mime = url.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
  css = css.replace(match[0], `url(data:${mime};base64,${bytes.toString('base64')})`);
}
const js = await readFile(localAsset(jsTag[1]), 'utf8');
html = html.replace(jsTag[0], '');
html = html.replace(cssTag[0], () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`);
html = html.replace('</body>', () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>\n</body>`);
await writeFile(output, html);
console.log(`Portable presentation: ${output} (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);
