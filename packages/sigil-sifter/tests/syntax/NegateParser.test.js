import Sifter from 'sigil-sifter';
import Module from '../support/module/index.js';
import items from '../fixtures/items.json' with { type: 'json' };
import {SearchSyntaxError} from '../../src/core/index.js';

const sifter = new Sifter();
Module(sifter);

describe('NegateParser', () => {
    it('negates an exact match', () => {
        const res = sifter.filter(items, '-!"Bookcase"');
        const names = res.map(i => i.name);

        expect(names).not.toContain('Bookcase');
        expect(names).not.toContain('bookcase');
        expect(names).toContain('Bookcase - Tall');
        expect(names.length).toBeGreaterThan(0);
    });

    it('negates a quoted string match', () => {
        const res = sifter.filter(items, '-"Hair Dryer"');
        const names = res.map(i => i.name);

        expect(names).not.toContain('Hair Dryer');
    });

    it('negates an unquoted string match', () => {
        const res = sifter.filter(items, '-Bookcase');
        const names = res.map(i => i.name);

        expect(names).not.toContain('Bookcase');
        expect(names).not.toContain('bookcase');
        expect(names).not.toContain('Bookcase - Tall');
        expect(names).toContain('Notebook');
    });

    it('negates a keyword filter', () => {
        const res = sifter.filter(items, '-price<50');
        const names = res.map(i => i.name);

        expect(names).toContain('Laptop Pro X200');
        expect(names).not.toContain('Coffee Mug');
    });

    it('negates a nested group', () => {
        const res = sifter.filter(items, '-(sold:true OR price>50)');
        const names = res.map(i => i.name);

        expect(names).toContain('Hair Dryer');
        // sold
        expect(names).not.toContain('Coffee Mug');
        // price > 50 and sold
        expect(names).not.toContain('Bookcase');
        expect(names).not.toContain('Laptop Pro X200');
        // not sold but price > 50
        expect(names).not.toContain('Vacuum Cleaner');
    });

    it('negates a nested group with AND', () => {
        const res = sifter.filter(items, '-(sold:true price<50)');
        const names = res.map(i => i.name);

        expect(names).not.toContain('Coffee Mug');
        expect(names).toContain('Bookcase');
    });

    it('returns empty array if nothing matches', () => {
        const res = sifter.filter(items, '-sold:true -sold:false');
        expect(res.length).toEqual(0);
    });

    it('fails if not followed by an expression', () => {
        expect(() => sifter.filter(items, 'book -')).toThrowError(
            SearchSyntaxError, /expected "-" to be followed by a filter/i
        );
    });
});
