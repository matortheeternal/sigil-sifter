import Sifter from '../../src/index.js';
import { NotImplementedError } from '../../src/core/index.js';
import {
    UnimplementedOpKeyword, MatchableOpKeyword, PartialOpKeyword
} from '../support/incompleteImplementations.js';

describe('Operator', () => {
    describe('matching', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([UnimplementedOpKeyword]);
            expect(() => sifter.filter([{}], 'op^1'))
                .toThrowError(NotImplementedError);
        });
    });

    describe('parsing', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([MatchableOpKeyword]);
            expect(() => sifter.filter([{}], 'op^1'))
                .toThrowError(NotImplementedError);
        });
    });

    describe('includes operator', () => {
        it('throws if unimplemented', () => {
            const sifter = new Sifter();
            sifter.addKeywords([PartialOpKeyword]);
            expect(() => sifter.filter([{}], 'op^1'))
                .toThrowError(NotImplementedError);
        });
    });
});
