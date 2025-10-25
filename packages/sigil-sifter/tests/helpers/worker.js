// test/helpers/runInWorker.js
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runFilterInWorker(items, query, timeoutMs = 1000) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'task.js'), {
            workerData: { items, query }
        });

        const timer = setTimeout(() => {
            worker.terminate().then(() => reject(new Error('timed out')));
        }, timeoutMs);

        worker.once('message', (msg) => {
            clearTimeout(timer);
            msg.ok ? resolve(msg.result) : reject(new Error(msg.error));
        });

        worker.once('error', (err) => {
            clearTimeout(timer);
            reject(err);
        });

        worker.once('exit', (code) => {
            if (code === 0) return;
            clearTimeout(timer);
            reject(new Error(`worker exited with code ${code}`));
        });
    });
}
