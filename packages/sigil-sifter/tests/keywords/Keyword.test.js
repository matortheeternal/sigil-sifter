import Sifter from '../../src/index.js';
import { UnimplementedKeyword } from '../support/incompleteImplementations.js';
import {NotImplementedError, SearchSyntaxError} from '../../src/core/index.js';
import {
    EqualsOperator, GreaterThanOperator, GTEOperator,
    IncludesOperator, LessThanOperator, LTEOperator,
    NotEqualOperator
} from '../../src/operators/index.js';
import Module from '../support/module/index.js';
import items from '../fixtures/items.json' with { type: 'json' };

describe('Keyword', () => {
    describe('keys', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            expect(() => sifter.addKeywords([UnimplementedKeyword]))
                .toThrowError(NotImplementedError);
        });
    });

    describe('supportedOperators', () => {
        it('returns all operators by default', () => {
            expect(UnimplementedKeyword.supportedOperators)
                .toEqual([
                    IncludesOperator, EqualsOperator, NotEqualOperator,
                    GTEOperator, LTEOperator, GreaterThanOperator, LessThanOperator
                ]);
        });
    });

    describe('supportedExpressions', () => {
        it('throws if unimplemented', () => {
            expect(() => UnimplementedKeyword.supportedExpressions)
                .toThrowError(NotImplementedError);
        });
    });

    describe('parseNext', () => {
        it('throws if unrecognized expression used', () => {
            const sifter = new Sifter();
            Module(sifter);
            expect(() => sifter.filter(items, 'sold:undefined'))
                .toThrowError(SearchSyntaxError, 'Failed to parse "undefined"');
        });

        it('throws if unrecognized operator used', () => {
            const sifter = new Sifter();
            Module(sifter);
            expect(() => sifter.filter(items, 'sold^undefined'))
                .toThrowError(SearchSyntaxError, 'Failed to parse "^undefined"');
        });
    })
});
