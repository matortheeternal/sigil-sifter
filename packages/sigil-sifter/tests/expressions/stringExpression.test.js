import { runFilterInWorker } from '../helpers/worker.js';
import items from '../fixtures/items.json' with { type: 'json' };

describe('StringExpression', () => {
    describe('quoted strings', () => {
        it('handles unterminated without throwing', async () => {
            const query = '"' + 'a'.repeat(1023);
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });

        it('handles many empty strings', async () => {
            const query = '"" '.repeat(340);
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });

        it('handles backslashes', async () => {
            const query = '"' + '\\'.repeat(1020) + '"';
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });

        it('handles escaped final quote', async () => {
            const query = '"' + '\\'.repeat(1021) + '"';
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });
    });
})
