import Sifter from 'sigil-sifter';
import Module from '../support/module/index.js';
import items from '../fixtures/items.json' with { type: 'json' };

const sifter = new Sifter();
Module(sifter);

describe('ExactParser', () => {
    it('matches an exact name using !"" syntax', () => {
        const res = sifter.filter(items, '!"Coffee Mug"');
        expect(res.length).toEqual(1);
        expect(res[0].name).toEqual('Coffee Mug');
    });

    it('does not match items with longer names containing the exact match', () => {
        const res = sifter.filter(items, '!"Bookcase"');
        const names = res.map(i => i.name);

        expect(names).toContain('Bookcase');
        expect(names).toContain('bookcase');
        expect(names).not.toContain('Bookcase - Tall');
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(items, '!"bookcase"');
        const res2 = sifter.filter(items, '!"BOOKCASE"');
        expect(res1).toEqual(res2);
    });

    it('returns an empty array if noting matches', () => {
        const res = sifter.filter(items, '!"Laptop"');
        expect(res.length).toEqual(0);
    });
});
