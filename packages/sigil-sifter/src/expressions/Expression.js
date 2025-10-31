import Node from '../core/Node.js';
import { NotImplementedError } from '../core/customErrors.js';

export default class Expression extends Node {
    static match(sifter, str) {
        throw new NotImplementedError();
    }

    static parse(sifter, match, str) {
        return new this(sifter, match, str);
    }

    equals(val) {
        throw new NotImplementedError();
    }

    greaterThan(val) {
        throw new NotImplementedError();
    }

    lessThan(val) {
        throw new NotImplementedError();
    }
}
