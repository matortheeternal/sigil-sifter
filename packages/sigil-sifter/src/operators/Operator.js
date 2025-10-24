import { Node, NotImplementedError } from '../core/index.js';

export default class Operator extends Node {
    static match(sifter, str) {
        throw new NotImplementedError();
    }

    static parse(sifter, match, str) {
        throw new NotImplementedError();
    }

    testValue(val, expression) {
        throw new NotImplementedError();
    }
}
