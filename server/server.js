import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, 'data.json');
const UPLOADS_DIR = join(__dirname, 'uploads');
const DIST_DIR = join(__dirname, '..', 'dist');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const SECRET = crypto.createHash('sha256').update(`${ADMIN_USER}:${ADMIN_PASS}`).digest('hex');
function generateToken() {
  return crypto.createHmac('sha256', SECRET).update(ADMIN_USER).digest('hex');
}

mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, unique + extname(file.originalname));
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

const app = express();
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  if (auth.slice(7) !== generateToken()) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ── Auth ─────────────────────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ token: generateToken() });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/logout', (_req, res) => {
  res.json({ ok: true });
});

function readData() {
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return { concerts: [], events: [], news: [] };
  }
}

function writeData(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  scheduleAutoCommit();
}

let autoCommitTimer = null;
function scheduleAutoCommit() {
  if (autoCommitTimer) clearTimeout(autoCommitTimer);
  autoCommitTimer = setTimeout(() => {
    const repoRoot = join(__dirname, '..');
    exec('git add server/data.json && git commit -m "Auto-save: data updated" && git push', { cwd: repoRoot }, (err, stdout, stderr) => {
      if (err) { console.error('[auto-commit] failed:', stderr || err.message); }
      else { console.log('[auto-commit] data.json saved to git'); }
    });
  }, 2000);
}

// ── File Upload ──────────────────────────────────────────────────────────────
app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file received' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ── Concerts ─────────────────────────────────────────────────────────────────
app.get('/api/concerts', (_req, res) => {
  res.json(readData().concerts);
});

app.post('/api/concerts', requireAuth, (req, res) => {
  const data = readData();
  const item = { ...req.body, id: Date.now().toString() };
  data.concerts.unshift(item);
  writeData(data);
  res.json(item);
});

// Reorder – full array replace (no :id segment, won't clash with /:id)
app.put('/api/concerts', requireAuth, (req, res) => {
  const data = readData();
  data.concerts = req.body;
  writeData(data);
  res.json(data.concerts);
});

app.put('/api/concerts/:id', requireAuth, (req, res) => {
  const data = readData();
  data.concerts = data.concerts.map(c => c.id === req.params.id ? req.body : c);
  writeData(data);
  res.json(req.body);
});

app.delete('/api/concerts/:id', requireAuth, (req, res) => {
  const data = readData();
  data.concerts = data.concerts.filter(c => c.id !== req.params.id);
  writeData(data);
  res.json({ ok: true });
});

// ── Events ────────────────────────────────────────────────────────────────────
app.get('/api/events', (_req, res) => {
  res.json(readData().events);
});

app.post('/api/events', requireAuth, (req, res) => {
  const data = readData();
  const item = { ...req.body, id: Date.now().toString() };
  data.events.unshift(item);
  writeData(data);
  res.json(item);
});

app.put('/api/events', requireAuth, (req, res) => {
  const data = readData();
  data.events = req.body;
  writeData(data);
  res.json(data.events);
});

app.put('/api/events/:id', requireAuth, (req, res) => {
  const data = readData();
  data.events = data.events.map(e => e.id === req.params.id ? req.body : e);
  writeData(data);
  res.json(req.body);
});

app.delete('/api/events/:id', requireAuth, (req, res) => {
  const data = readData();
  data.events = data.events.filter(e => e.id !== req.params.id);
  writeData(data);
  res.json({ ok: true });
});

// ── News ──────────────────────────────────────────────────────────────────────
app.get('/api/news', (_req, res) => {
  res.json(readData().news);
});

app.post('/api/news', requireAuth, (req, res) => {
  const data = readData();
  const item = { ...req.body, id: Date.now().toString() };
  data.news.unshift(item);
  writeData(data);
  res.json(item);
});

app.put('/api/news', requireAuth, (req, res) => {
  const data = readData();
  data.news = req.body;
  writeData(data);
  res.json(data.news);
});

app.put('/api/news/:id', requireAuth, (req, res) => {
  const data = readData();
  data.news = data.news.map(n => n.id === req.params.id ? req.body : n);
  writeData(data);
  res.json(req.body);
});

app.delete('/api/news/:id', requireAuth, (req, res) => {
  const data = readData();
  data.news = data.news.filter(n => n.id !== req.params.id);
  writeData(data);
  res.json({ ok: true });
});

// ── Serve React build in production ─────────────────────────────────────────
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (_req, res) => res.sendFile(join(DIST_DIR, 'index.html')));
}

// ─────────────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Data stored in: ${DATA_FILE}`);
  if (existsSync(DIST_DIR)) console.log('Serving React build from dist/');
});
