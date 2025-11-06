import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('Restricted keyword', () => {
    it('matches cards restricted in Vintage', () => {
        const res = sifter.filter(cards, 'restricted:vintage');
        expectCardNames(res, [
            'Balance',
            'Black Lotus',
            'Gitaxian Probe',
            'Sol Ring',
            'Time Vault'
        ]);
        expectNotCardNames(res, ['Oko, Thief of Crowns', 'Doubling Season']);
    });

    it('matches cards restricted in Duel Commander', () => {
        const res = sifter.filter(cards, 'restricted:duel');
        expectCardNames(res, ['Raffine, Scheming Seer']);
        expectNotCardNames(res, ['Balance', 'Black Lotus']);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'restricted:Vintage');
        const res2 = sifter.filter(cards, 'RESTRICTED:vintage');
        expect(res1).toEqual(res2);
    });

    it('supports = syntax equivalently', () => {
        const res1 = sifter.filter(cards, 'restricted:vintage');
        const res2 = sifter.filter(cards, 'restricted=vintage');
        expect(res1).toEqual(res2);
    });

    it('returns empty results for formats with no restrictions', () => {
        const res = sifter.filter(cards, 'restricted:modern');
        expect(res.length).toBe(0);
    });
});
