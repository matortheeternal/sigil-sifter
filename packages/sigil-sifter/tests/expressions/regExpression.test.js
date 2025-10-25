import { runFilterInWorker } from '../helpers/worker.js';
import items from '../fixtures/items.json' with { type: 'json' };

describe('RegExpression', () => {
    const makeItems = (name, count) => Array(count).fill({ name });

    describe('basic expressions', () => {
        it('handles simple literal patterns', async () => {
            const items = makeItems('hello world', 500);
            const query = 'name:/world/';
            const result = await runFilterInWorker(items, query);
            expect(result).toEqual(items);
        });

        it('handles anchored simple pattern', async () => {
            const items = makeItems('abc123', 500);
            const query = 'name:/^abc\\d+$/';
            const result = await runFilterInWorker(items, query);
            expect(result).toEqual(items);
        });
    });

    describe('stress tests', () => {
        it('handles many escapes', async () => {
            const query = 'name:/(' + '\\'.repeat(500) +  '|.)/';
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });

        it('handles unbounded dot with anchors', async () => {
            const query = 'name:/^.*END$/';
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });

        it('handles simple lookbehind', async () => {
            const query = 'name:/(?<!x)c/';
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });

        it('handles large linear patterns', async () => {
            const items = makeItems('a'.repeat(200), 100);
            const query = 'name:/^[a]+$/i';
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });

        it('handles near miss with groups', async () => {
            const items = makeItems('ab'.repeat(20) + 'a', 100);
            const query  = 'name:/^((ab)*)+$/';
            await expectAsync(runFilterInWorker(items, query)).toBeRejected();
        });

        it('handles lookbehind with nested quantifier', async () => {
            const items = makeItems('a'.repeat(200) + 'b', 2);
            const query  = 'name:/(?<!(a+)+)b/';
            const result = await runFilterInWorker(items, query);
            expect(Array.isArray(result)).toBeTrue();
        });

        it('times out from nested quantifiers', async () => {
            const items = makeItems('a'.repeat(30) + '!', 100);
            const query  = 'name:/^(a+)+$/';
            await expectAsync(runFilterInWorker(items, query)).toBeRejected();
        });

        it('times out from ambiguous alternation', async () => {
            const items = makeItems('a'.repeat(30) + '!', 100);
            const query  = 'name:/^(a|aa)+$/';
            await expectAsync(runFilterInWorker(items, query)).toBeRejected();
        });

        it('times out from backreference blowup', async () => {
            const items = makeItems('x'.repeat(100), 100);
            const query  = 'name:/^(.+)+\\\\1$/';
            await expectAsync(runFilterInWorker(items, query)).toBeRejected();
        });

        it('times out from huge alternation set', async () => {
            const alts = Array.from({ length: 50 }, (_, i) => 'a'.repeat(i + 1)).join('|');
            const items = makeItems('a'.repeat(48), 4);
            const query  = `name:/^(${alts})+$/`;
            await expectAsync(runFilterInWorker(items, query)).toBeRejected();
        });
    });
});
