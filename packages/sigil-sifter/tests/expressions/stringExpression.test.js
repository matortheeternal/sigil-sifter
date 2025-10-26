import { runFilterInWorker } from '../helpers/worker.js';
import items from '../fixtures/items.json' with { type: 'json' };

describe('StringExpression', () => {
    describe('operators', () => {
        it('checks contains for includes operator', async () => {
            const query = 'name:book';
            const res = await runFilterInWorker(items, query);
            const names = res.map(i => i.name);
            expect(names).toContain('Bookcase');
            expect(names).toContain('Bookcase - Tall');
            expect(names).toContain('bookcase');
            expect(names).toContain('Notebook');
        });

        it('checks equality for equals operator', async () => {
            const query = 'name=bookcase';
            const res = await runFilterInWorker(items, query);
            const names = res.map(i => i.name);
            expect(names).toContain('Bookcase');
            expect(names).toContain('bookcase');
            expect(names).not.toContain('Notebook');
            expect(names).not.toContain('Bookcase - Tall');
        });

        it('throws with greater than operator', async () => {
            const query = 'name>bookcase';
            await expectAsync(runFilterInWorker(items, query)).toBeRejected();
        });

        it('throws with less than operator', async () => {
            const query = 'name<bookcase';
            await expectAsync(runFilterInWorker(items, query)).toBeRejected();
        });
    });

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
