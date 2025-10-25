import { runFilterInWorker } from './helpers/worker.js';
import items from './fixtures/items.json' with { type: 'json' };

describe('sigilSifter', () => {
    describe('filter', () => {
        it('throws if max length exceeded', async () => {
            const query = 'a'.repeat(1025);
            await expectAsync(runFilterInWorker(items, query))
                .toBeRejectedWithError(/exceeds the maximum allowed length/);
        });
    });
});
