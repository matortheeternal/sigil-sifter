import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import CardMagicianMagic from '@sigil-sifter/magic-cm';
import { THE_FERRYMAN, CLOUD_EATER } from './cards.js';
import { expectCardNames, expectNotCardNames } from './helpers.js';

describe('TagKeyword', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter);
        CardMagicianMagic(sifter);
    });

    describe('includes', () => {
        it('returns cards that have the tag', () => {
            const cards = [THE_FERRYMAN, CLOUD_EATER];
            const results = sifter.filter(cards, 'tag:removal');
            const results2 = sifter.filter(cards, 'otag:removal');
            expectNotCardNames(results, ['The Ferryman']);
            expectCardNames(results, ['Cloud Eater']);
            expect(results).toEqual(results2);
        });
    });

    describe('equals', () => {
        it('returns cards that have the tag', () => {
            const cards = [THE_FERRYMAN, CLOUD_EATER];
            const results = sifter.filter(cards, 'tag=removal');
            const results2 = sifter.filter(cards, 'otag=removal');
            expectNotCardNames(results, ['The Ferryman']);
            expectCardNames(results, ['Cloud Eater']);
            expect(results).toEqual(results2);
        });
    });
});
