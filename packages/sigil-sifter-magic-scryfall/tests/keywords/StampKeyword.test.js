import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/extras.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('Stamp keyword', () => {
    it('matches cards with an oval stamp', () => {
        const res = sifter.filter(cards, 'stamp:oval');
        expectCardNames(res, ['God-Eternal Kefnet']);
        expectNotCardNames(res, [
            'Oracle of the Alpha',
            'Toski, Bearer of Secrets',
            'A-Thousand-Faced Shadow',
            'Tidings',
            'Battlefield Forge'
        ]);
    });

    it('matches cards with an acorn stamp', () => {
        const res = sifter.filter(cards, 'stamp:acorn');
        expectCardNames(res, ['Oracle of the Alpha']);
        expectNotCardNames(res, [
            'God-Eternal Kefnet',
            'Toski, Bearer of Secrets',
            'A-Thousand-Faced Shadow'
        ]);
    });

    it('matches cards with an arena stamp', () => {
        const res = sifter.filter(cards, 'stamp:arena');
        expectCardNames(res, ['A-Thousand-Faced Shadow']);
        expectNotCardNames(res, [
            'Oracle of the Alpha',
            'God-Eternal Kefnet',
            'Toski, Bearer of Secrets'
        ]);
    });

    it('matches cards with a triangle stamp', () => {
        const res = sifter.filter(cards, 'stamp:triangle');
        expectCardNames(res, ['Toski, Bearer of Secrets']);
        expectNotCardNames(res, [
            'Oracle of the Alpha',
            'A-Thousand-Faced Shadow',
            'God-Eternal Kefnet'
        ]);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'stamp:ACORN');
        const res2 = sifter.filter(cards, 'STAMP:acorn');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Oracle of the Alpha']);
    });

    it('treats "=" and ":" operators equivalently', () => {
        const res1 = sifter.filter(cards, 'stamp=oval');
        const res2 = sifter.filter(cards, 'stamp:oval');
        expect(res1).toEqual(res2);
    });

    it('supports negation (-stamp)', () => {
        const res = sifter.filter(cards, '-stamp:oval');
        expectNotCardNames(res, ['God-Eternal Kefnet']);
        expectCardNames(res, [
            'Oracle of the Alpha',
            'A-Thousand-Faced Shadow',
            'Toski, Bearer of Secrets',
            'Tidings',
            'Battlefield Forge'
        ]);
    });

    it('returns cards without stamps when no value matches', () => {
        const res = sifter.filter(cards, '-stamp:acorn -stamp:oval -stamp:arena -stamp:triangle');
        expectCardNames(res, ['Tidings', 'Battlefield Forge']);
    });

    it('returns an empty array for nonexistent stamp types', () => {
        const res = sifter.filter(cards, 'stamp:mythic');
        expect(res.length).toBe(0);
    });
});
