import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(repoRoot, '.pages-dist');

const commentDistDir = path.join(repoRoot, 'comment-statistics-ui', 'dist');
const commentTargetDir = path.join(outputDir, 'comment-statistics-ui');

const floraSourceDir = path.join(repoRoot, 'flora-guard-mvp');
const floraTargetDir = path.join(outputDir, 'flora-guard-mvp');

const landingHtml = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Routeam Demos</title>
    <style>
      :root {
        --bg: #f3f7fa;
        --card: #ffffff;
        --text: #132430;
        --muted: #557283;
        --accent: #1f7a8c;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", "Trebuchet MS", sans-serif;
        color: var(--text);
        background: radial-gradient(circle at 10% 0%, #d9eef3, transparent 40%), var(--bg);
      }
      .wrap {
        max-width: 860px;
        margin: 0 auto;
        padding: 48px 20px 60px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 34px;
      }
      p {
        margin: 0 0 22px;
        color: var(--muted);
      }
      .grid {
        display: grid;
        gap: 14px;
      }
      .card {
        display: block;
        text-decoration: none;
        color: inherit;
        background: var(--card);
        border: 1px solid #d7e6ed;
        border-radius: 14px;
        padding: 18px;
        box-shadow: 0 12px 28px rgba(20, 70, 82, 0.08);
      }
      .card strong {
        color: var(--accent);
        font-size: 20px;
      }
      .card span {
        display: block;
        margin-top: 6px;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <h1>Routeam Demos</h1>
      <p>Демо-проекты для презентаций и пилотов.</p>
      <section class="grid">
        <a class="card" href="./comment-statistics-ui/">
          <strong>comment-statistics-ui</strong>
          <span>Админ-панель CityFeedback (MVP 1.0)</span>
        </a>
        <a class="card" href="./flora-guard-mvp/">
          <strong>flora-guard-mvp</strong>
          <span>Демо-лендинг Flora Guard</span>
        </a>
      </section>
    </main>
  </body>
</html>
`;

async function buildPagesBundle() {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  await cp(commentDistDir, commentTargetDir, { recursive: true });
  await cp(floraSourceDir, floraTargetDir, { recursive: true });

  await writeFile(path.join(outputDir, 'index.html'), landingHtml, 'utf8');
  await writeFile(path.join(outputDir, '.nojekyll'), '', 'utf8');

  process.stdout.write('Prepared .pages-dist with comment-statistics-ui and flora-guard-mvp.\n');
}

buildPagesBundle().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
