// Stage 2: extract inner pages from each extracted page (nested bundles)
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { inflateSync, gunzipSync } from 'node:zlib';

const dirs = ['/home/z/my-project/extracted/v1', '/home/z/my-project/extracted/v2'];

function extractBlock(html, type) {
  const re = new RegExp(`<script type="__bundler/${type}">([\\s\\S]*?)<\\/script>`, 'i');
  const m = html.match(re);
  if (!m) return null;
  return m[1].trim();
}

function getTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (m) return m[1].trim();
  return 'untitled';
}

function decode(entry) {
  if (entry.compressed) {
    const buf = Buffer.from(entry.data, 'base64');
    try { return gunzipSync(buf).toString('utf8'); }
    catch { return inflateSync(buf).toString('utf8'); }
  }
  return Buffer.from(entry.data, 'base64').toString('utf8');
}

for (const dir of dirs) {
  const version = dir.endsWith('v1') ? 'v1' : 'v2';
  const outDir = `/home/z/my-project/extracted/final/${version}`;
  mkdirSync(outDir, { recursive: true });
  const files = readdirSync(dir).filter(f => f.endsWith('.html')).sort();
  console.log(`\n########## ${version} ##########`);
  for (const f of files) {
    const raw = readFileSync(`${dir}/${f}`, 'utf8');
    const manifestJson = extractBlock(raw, 'manifest');
    if (!manifestJson) {
      console.log(`${f}: NO inner manifest`);
      continue;
    }
    const manifest = JSON.parse(manifestJson);
    const orderRaw = extractBlock(raw, 'page_order');
    const order = orderRaw ? JSON.parse(orderRaw) : Object.keys(manifest);
    const extRaw = extractBlock(raw, 'ext_resources');
    const ext = extRaw ? JSON.parse(extRaw) : [];
    console.log(`\n--- ${f} : ${order.length} inner page(s), ${ext.length} ext resources ---`);
    if (ext.length) {
      for (const e of ext) {
        console.log(`    ext: mime=${e.mime} size=${(e.data ? e.data.length : 0)} src=${e.src || e.url || '?'}`);
      }
    }
    order.forEach((uuid, i) => {
      const entry = manifest[uuid];
      if (!entry) { console.log(`  MISSING ${uuid}`); return; }
      const html = decode(entry);
      const title = getTitle(html).slice(0, 60).replace(/[\\/:*?"<>|]+/g, '-');
      const name = `${f.replace(/\.html$/, '')}__${String(i + 1).padStart(2, '0')}-${title}.html`;
      writeFileSync(`${outDir}/${name}`, html);
      console.log(`  ${String(i + 1).padStart(2, '0')}. ${title}  (${(html.length / 1024).toFixed(0)} KB)`);
    });
  }
}
