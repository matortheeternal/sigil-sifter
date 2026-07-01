import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import CardMagicianMagic from '@sigil-sifter/magic-cm';
import { THE_FERRYMAN, THE_MOTHERSHIP, OMNUS_EMBLEM } from './cards.js';
import { expectCardNames, expectNotCardNames } from './helpers.js';

describe('CardMagicianCard', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter);
        CardMagicianMagic(sifter);
    });

    describe('rarity parsing regression', () => {
        it('does not ignore search terms after rarity', () => {
            const cards = [THE_FERRYMAN, THE_MOTHERSHIP];
            const results = sifter.filter(cards, 'r=r c=b');
            expectNotCardNames(results, ['The Mothership']);
            expectCardNames(results, ['The Ferryman']);
        });
    });

    describe('emblem color regression', () => {
        it('does not error when searching by color with emblem present', () => {
            expect(() => {
                const cards = [OMNUS_EMBLEM, THE_FERRYMAN];
                const results = sifter.filter(cards, 'c=b');
                expectNotCardNames(results, ['Omnus']);
                expectCardNames(results, ['The Ferryman']);
            }).not.toThrow();
        });
    })
});
