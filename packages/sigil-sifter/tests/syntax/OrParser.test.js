import Sifter from 'sigil-sifter';
import { SearchSyntaxError } from 'sigil-sifter/core';
import TestModule from '../support/module/index.js';
import items from '../fixtures/items.json' with { type: 'json' };

const sifter = new Sifter();
TestModule(sifter);

describe('OrParser syntax', () => {
    it('throws when query starts with OR', () => {
        expect(() => sifter.filter(items, 'OR hair'))
            .toThrowError(SearchSyntaxError, /Invalid OR syntax/i);
    });

    it('throws when OR follows another OR', () => {
        expect(() => sifter.filter(items, 'hair OR OR coffee'))
            .toThrowError(SearchSyntaxError, /Invalid OR syntax/i);
    });

    it('requires whitespace to parse', () => {
        const res = sifter.filter(items, 'orange');
        expect(res.map(i => i.name)).toEqual([]);
    });

    it('allows arbitrary whitespace', () => {
        const res1 = sifter.filter(items, 'Hair    OR   Coffee');
        const res2 = sifter.filter(items, 'Hair\t\nOR\tCoffee');
        expect(res1).toEqual(res2);
        expect(res1.map(i => i.name)).toEqual(
            jasmine.arrayContaining(['Hair Dryer', 'Coffee Mug'])
        );
    });

    it('is case-insensitive', () => {
        const resLower = sifter.filter(items, 'Hair or Coffee');
        const resUpper = sifter.filter(items, 'Hair OR Coffee');
        const resMixed = sifter.filter(items, 'Hair Or Coffee');
        expect(resLower).toEqual(resUpper);
        expect(resUpper).toEqual(resMixed);
        expect(resLower.map(i => i.name)).toEqual(
            jasmine.arrayContaining(['Hair Dryer', 'Coffee Mug'])
        );
    });

    it('groups filters before and after OR into two groups', () => {
        const res = sifter.filter(items, 'hair sold:false OR Coffee price<5');
        const names = res.map(i => i.name);

        expect(names).toContain('Hair Dryer');
        expect(names).toContain('Coffee Mug');
        expect(names).not.toContain('Laptop Pro X200');
    });
});
