import Sifter from '../../src/index.js';
import { NotImplementedError } from '../../src/core/index.js';
import {
    MatchableKeyword, PartialKeyword, UnimplementedKeyword
} from '../support/incompleteImplementations.js';

describe('Expression', () => {
    describe('matching', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([UnimplementedKeyword]);
            expect(() => sifter.filter([{}], 'u:test'))
                .toThrowError(NotImplementedError);
        });
    });

    describe('parsing', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([MatchableKeyword]);
            expect(() => sifter.filter([{}], 'm:test'))
                .toThrowError(NotImplementedError);
        });
    });

    describe('includes operator', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([PartialKeyword]);
            expect(() => sifter.filter([{}], 'p:test'))
                .toThrowError(NotImplementedError);
        });
    });

    describe('equals operator', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([PartialKeyword]);
            expect(() => sifter.filter([{}], 'p=test'))
                .toThrowError(NotImplementedError);
        });
    });

    describe('greaterThan operator', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([PartialKeyword]);
            expect(() => sifter.filter([{}], 'p>test'))
                .toThrowError(NotImplementedError);
        });
    });

    describe('lessThan operator', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([PartialKeyword]);
            expect(() => sifter.filter([{}], 'p<test'))
                .toThrowError(NotImplementedError);
        });
    });
});
