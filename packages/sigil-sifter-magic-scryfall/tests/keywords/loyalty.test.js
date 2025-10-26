import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/fixtures.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames } from '../helpers.js';

describe('Loyalty keyword', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter, ScryfallCard);
    });

    it('works with loy and loyalty', () => {
        const res1 = sifter.filter(cards, 'loy:4');
        const res2 = sifter.filter(cards, 'loyalty:4');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Oko, Thief of Crowns',
            'Tamiyo, Field Researcher',
            'Teferi, Time Raveler',
        ]);
    });

    it('supports greater than (>) operator', () => {
        const res = sifter.filter(cards, 'loy>3');
        expectCardNames(res, [
            'Oko, Thief of Crowns',
            'Nicol Bolas, Planeswalker',
            'Liliana, Dreadhorde General',
        ]);
    });

    it('supports less than (<) operator', () => {
        const res = sifter.filter(cards, 'loy<5');
        expectCardNames(res, [
            'Oko, Thief of Crowns',
            'Tamiyo, Field Researcher',
            'Domri, Anarch of Bolas',
        ]);
    });

    it('supports greater than or equal to (>=) operator', () => {
        const res = sifter.filter(cards, 'loy>=3');
        expectCardNames(res, [
            'Domri, Anarch of Bolas',
            'Tamiyo, Field Researcher',
            'Liliana, Dreadhorde General',
        ]);
    });

    it('supports less than or equal to (<=) operator', () => {
        const res = sifter.filter(cards, 'loy<=4');
        expectCardNames(res, [
            'Domri, Anarch of Bolas',
            'Tamiyo, Field Researcher',
            'Teferi, Time Raveler',
        ]);
    });

    it('supports not equal (!=) operator', () => {
        const res = sifter.filter(cards, 'loy!=3 loy!=5');
        expectCardNames(res, [
            'Oko, Thief of Crowns',
            'Liliana, Dreadhorde General',
            'Teferi, Time Raveler',
        ]);
    });

    it('supports equal (=) operator', () => {
        const res = sifter.filter(cards, 'loy=4');
        expectCardNames(res, [
            'Oko, Thief of Crowns',
            'Tamiyo, Field Researcher',
            'Teferi, Time Raveler',
        ]);
    });
});
