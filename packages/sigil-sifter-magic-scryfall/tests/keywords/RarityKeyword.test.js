import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames } from '../helpers.js';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('Rarity keyword', () => {
    describe('common', () => {
        it('matches case-insensitively', () => {
            const res1 = sifter.filter(cards, 'rarity:common');
            const res2 = sifter.filter(cards, 'RARITY:C');
            expect(res1).toEqual(res2);
            expectCardNames(res1, [
                'Tarmogoyf', 'Dark Ritual', 'Llanowar Elves',
                'Seething Song', 'Murder'
            ]);
        });

        it('has no lower rarities', () => {
            const res = sifter.filter(cards, 'r<c');
            expect(res).toEqual([]);
        });

        it('is lower than all other rarities', () => {
            const res = sifter.filter(cards, 'r>c');
            expectCardNames(res, [
                'Serra Angel',
                'Abrupt Decay',
                'Omniscience',
                'Jolrael, Empress of Beasts',
                'Black Lotus'
            ]);
        });
    });

    describe('uncommon', () => {
        it('supports full name and shorthand', () => {
            const res1 = sifter.filter(cards, 'rarity:uncommon');
            const res2 = sifter.filter(cards, 'r:U');
            expect(res1).toEqual(res2);
            expectCardNames(res1, ['Serra Angel', 'Counterspell', 'Rancor']);
        });

        it('is greater than common', () => {
            const res = sifter.filter(cards, 'r<u');
            expectCardNames(res, ['Tarmogoyf', 'Llanowar Elves']);
        });

        it('is lower than rare, mythic, special, and bonus', () => {
            const res = sifter.filter(cards, 'r>u');
            expectCardNames(res, [
                'Abrupt Decay', 'Omniscience',
                'Jolrael, Empress of Beasts', 'Black Lotus'
            ]);
        });
    });

    describe('rare', () => {
        it('supports full name and shorthand', () => {
            const res1 = sifter.filter(cards, 'rarity:rare');
            const res2 = sifter.filter(cards, 'r:R');
            expect(res1).toEqual(res2);
            expectCardNames(res1, [
                'Abrupt Decay', 'Deathrite Shaman',
                'Stoneforge Mystic', 'Rampaging Baloths'
            ]);
        });

        it('is greater than uncommon and common', () => {
            const res = sifter.filter(cards, 'r<r');
            expectCardNames(res, ['Serra Angel', 'Tarmogoyf']);
        });

        it('is lower than mythic, special, and bonus', () => {
            const res = sifter.filter(cards, 'r>r');
            expectCardNames(res, [
                'Omniscience', 'Jolrael, Empress of Beasts', 'Black Lotus'
            ]);
        });
    });

    describe('mythic', () => {
        it('supports full name and shorthand', () => {
            const res1 = sifter.filter(cards, 'rarity:mythic');
            const res2 = sifter.filter(cards, 'r:M');
            expect(res1).toEqual(res2);
            expectCardNames(res1, ['Omniscience', 'Atraxa, Praetors\' Voice']);
        });

        it('is greater than rare, uncommon, and common', () => {
            const res = sifter.filter(cards, 'r<m');
            expectCardNames(res, ['Abrupt Decay', 'Serra Angel', 'Tarmogoyf']);
        });

        it('is lower than bonus', () => {
            const res = sifter.filter(cards, 'r>m');
            expectCardNames(res, ['Black Lotus']);
        });
    });

    describe('special', () => {
        it('supports full name and shorthand', () => {
            const res1 = sifter.filter(cards, 'rarity:special');
            const res2 = sifter.filter(cards, 'r:S');
            expect(res1).toEqual(res2);
            expectCardNames(res1, ['Jolrael, Empress of Beasts']);
        });

        it('is greater than rare, uncommon, and common', () => {
            const res = sifter.filter(cards, 'r<s');
            expectCardNames(res, ['Abrupt Decay', 'Serra Angel', 'Tarmogoyf']);
        });

        it('is lower than bonus', () => {
            const res = sifter.filter(cards, 'r>s');
            expectCardNames(res, ['Black Lotus']);
        });
    });

    describe('bonus', () => {
        it('supports full name and shorthand', () => {
            const res1 = sifter.filter(cards, 'rarity:bonus');
            const res2 = sifter.filter(cards, 'r:B');
            expect(res1).toEqual(res2);
            expectCardNames(res1, ['Black Lotus']);
        });

        it('is greater than all other rarities', () => {
            const res = sifter.filter(cards, 'r<b');
            expectCardNames(res, [
                'Tarmogoyf',
                'Serra Angel',
                'Abrupt Decay',
                'Omniscience',
                'Jolrael, Empress of Beasts'
            ]);
        });

        it('has no higher rarities', () => {
            const res = sifter.filter(cards, 'r>b');
            expect(res).toEqual([]);
        });
    });
});
