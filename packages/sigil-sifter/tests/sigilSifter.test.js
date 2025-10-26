import { runFilterInWorker } from './helpers/worker.js';
import items from './fixtures/items.json' with { type: 'json' };
import Sifter from '../src/index.js';
import Keyword from '../src/keywords/Keyword.js';
import { KeyConflictError } from '../src/core/customErrors.js';

describe('sigilSifter', () => {
    describe('filter', () => {
        it('throws if max length exceeded', async () => {
            const query = 'a'.repeat(1025);
            await expectAsync(runFilterInWorker(items, query))
                .toBeRejectedWithError(/exceeds the maximum allowed length/);
        });
    });

    describe('addKeywords', () => {
        it('throws if duplicate keyword added', async () => {
            const sifter = new Sifter();
            class AKeyword extends Keyword {
                static get keys() { return ['a']; }
            }
            class BKeyword extends AKeyword {}
            expect(() => sifter.addKeywords([AKeyword, BKeyword])).toThrowError(
                KeyConflictError,
                'Key "a" for BKeyword was already registered for AKeyword'
            );
        });
    });
});
