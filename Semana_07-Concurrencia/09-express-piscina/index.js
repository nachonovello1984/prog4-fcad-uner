import express from 'express';
import Piscina from 'piscina';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const piscina = new Piscina({
  filename: join(__dirname, 'worker.js'),
  minThreads: 4,
  maxThreads: 4,
});

let job = {
  status: 'idle',
  total: 0,
  completed: 0,
  startedAt: null,
  finishedAt: null,
  inputs: [],
  results: [],
  error: null,
};

function resetJob() {
  job = {
    status: 'idle',
    total: 0,
    completed: 0,
    startedAt: null,
    finishedAt: null,
    inputs: [],
    results: [],
    error: null,
  };
}

app.post('/start', (req, res) => {
  if (job.status === 'running') {
    return res.status(409).json({
      message: 'A job is already running',
      status: job.status,
      completed: job.completed,
      total: job.total,
    });
  }

  const inputs = Array.from({ length: 10 }, (_, i) => 40 + i);

  job.status = 'running';
  job.total = inputs.length;
  job.completed = 0;
  job.startedAt = Date.now();
  job.finishedAt = null;
  job.inputs = inputs;
  job.results = Array(inputs.length).fill(null);
  job.error = null;

  const tasks = inputs.map((n, index) =>
    piscina
      .run({ n })
      .then((value) => {
        job.results[index] = value;
        job.completed += 1;
        return value;
      })
  );

  Promise.all(tasks)
    .then(() => {
      job.status = 'done';
      job.finishedAt = Date.now();
    })
    .catch((err) => {
      job.status = 'error';
      job.error = err?.message ?? String(err);
      job.finishedAt = Date.now();
    });

  return res.status(202).json({
    message: 'Job started',
    status: job.status,
    total: job.total,
  });
});

app.get('/status', (req, res) => {
  const progress = job.total === 0 ? 0 : job.completed / job.total;

  return res.json({
    status: job.status,
    total: job.total,
    completed: job.completed,
    progress,
    progressPct: Math.round(progress * 100),
    startedAt: job.startedAt,
    finishedAt: job.finishedAt,
    inputs: job.inputs,
    results: job.status === 'done' ? job.results : undefined,
    error: job.status === 'error' ? job.error : undefined,
  });
});

app.post('/reset', (req, res) => {
  if (job.status === 'running') {
    return res.status(409).json({ message: 'Job is running' });
  }

  resetJob();
  return res.json({ message: 'Reset ok' });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
