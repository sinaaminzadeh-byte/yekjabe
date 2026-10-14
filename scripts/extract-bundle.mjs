// Extract pages from __bundler self-extracting HTML files
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { inflateSync, gunzipSync } from 'node:zlib';
import { basename } from 'node:path';

const files = [
  { input: '/home/z/my-project/upload/پیشتم — وباپ هدیهی دوستانه (1).html', out: '/home/z/my-project/extracted/v1' },
  { input: '/home/z/my-project/upload/پیشتم — وباپ هدیهی دوستانه (2).html', out: '/home/z/my-project/extracted/v2' },
];

function extractBlock(html, type) {
  const re = new RegExp(`<script type="__bundler/${type}">([\\s\\S]*?)<\\/script>`, 'i');
  const m = html.match(re);
  if (!m) throw new Error(`block ${type} not found`);
  return m[1].trim();
}

function getTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (m) return m[1].trim();
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return h1[1].replace(/<[^>]+>/g, '').trim();
  return 'untitled';
}

for (const { input, out } of files) {
  const raw = readFileSync(input, 'utf8');
  const manifestJson = extractBlock(raw, 'manifest');
  const manifest = JSON.parse(manifestJson);
  const order = JSON.parse(extractBlock(raw, 'page_order'));
  mkdirSync(out, { recursive: true });
  console.log(`\n=== ${basename(input)} : ${order.length} pages ===`);
  order.forEach((uuid, i) => {
    const entry = manifest[uuid];
    if (!entry) {
      console.log(`${i + 1}. MISSING ${uuid}`);
      return;
    }
    let html;
    if (entry.compressed) {
      const buf = Buffer.from(entry.data, 'base64');
      // try gzip then raw deflate
      try { html = gunzipSync(buf).toString('utf8'); }
      catch { html = inflateSync(buf).toString('utf8'); }
    } else {
      html = Buffer.from(entry.data, 'base64').toString('utf8');
    }
    const title = getTitle(html).slice(0, 60).replace(/[\\/:*?"<>|]+/g, '-');
    const name = `${String(i + 1).padStart(2, '0')}-${title}.html`;
    writeFileSync(`${out}/${name}`, html);
    console.log(`${String(i + 1).padStart(2, '0')}. ${title}  (${(html.length / 1024).toFixed(0)} KB)`);
  });
}
