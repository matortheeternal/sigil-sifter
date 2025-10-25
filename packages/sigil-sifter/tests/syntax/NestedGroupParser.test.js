import Sifter from 'sigil-sifter';
import Module from '../support/module/index.js';
import items from '../fixtures/items.json' with { type: 'json' };
import { SearchSyntaxError } from '../../src/core/index.js';

describe('NestedGroupParser', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Module(sifter);
    });

    it('handles empty groups gracefully', () => {
        const res = sifter.filter(items, '()');
        expect(res.length).toBeGreaterThan(0);
    });

    it('ignores unclosed parens', () => {
        const res = sifter.filter(items, '(');
        expect(res.length).toBeGreaterThan(0);
    });

    it('handles a single filter in a group', () => {
        const res = sifter.filter(items, '(Hair)');
        const names = res.map(i => i.name);
        expect(names).toContain('Hair Dryer');
    });

    it('throws an error on extra closing parenthesis', () => {
        expect(() => sifter.filter(items, '("Coffee Mug"))'))
            .toThrowError(SearchSyntaxError, /could not find parser to parse/i);
    });

    it('matches multiple terms in a group', () => {
        const res = sifter.filter(items, '(price>1 "o")');
        const names = res.map(i => i.name);
        expect(names).toContain('Coffee Mug');
        expect(names).toContain('Bookcase');
    });

    it('handles OR inside and between nested groups', () => {
        const res = sifter.filter(items, '(Coffee OR (price>100 sold:true))');
        const names = res.map(i => i.name);
        expect(names).toContain('Coffee Mug');
        expect(names).toContain('Laptop Pro X200');
    });

    it('handles OR between multi-term groups (text text OR text text)', () => {
        const res = sifter.filter(items, '((price>50 sold:false) OR (price<5 sold:true))');
        const names = res.map(i => i.name);
        expect(names).toContain('Negative Price Error');
        expect(names).toContain('Children\'s Toy');
        expect(names).toContain('Office Chair');
        expect(names).toContain('bookcase');
    });

    it('handles deep nesting', () => {
        const res = sifter.filter(items, '((((Coffee) OR (Desk)) OR Book))');
        const names = res.map(i => i.name);
        expect(names).toContain('Coffee Mug');
        expect(names).toContain('Bookcase');
        expect(names).toContain('Desk Lamp');
    });
});
