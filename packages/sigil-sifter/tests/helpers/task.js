import { parentPort, workerData } from 'worker_threads';
import Sifter from 'sigil-sifter';
import Module from '../support/module/index.js';

try {
    const sifter = new Sifter();
    Module(sifter);

    const { items, query } = workerData;
    const result = sifter.filter(items, query);
    parentPort.postMessage({ ok: true, result });
} catch (e) {
    parentPort.postMessage({
        ok: false,
        error: e && e.stack ? e.stack : String(e)
    });
}
