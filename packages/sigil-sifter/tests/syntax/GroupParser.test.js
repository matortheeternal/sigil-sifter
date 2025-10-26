import Sifter from 'sigil-sifter';
import Module from '../support/module/index.js';
import GroupParser from '../../src/syntax/GroupParser.js';

const sifter = new Sifter();
Module(sifter);

describe('GroupParser', () => {
    it('throws if using unknown mode', () => {
        const group = new GroupParser(sifter, [], '', { mode: 'DNE' });
        expect(() => group.test({})).toThrowError(/Unknown filter group mode/i);
    });
});
