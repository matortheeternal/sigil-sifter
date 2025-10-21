import Node from '../core/Node.js';
import { NotImplementedError } from '../core/customErrors.js';

export default class Expression extends Node {
    static match(str) {
        throw new NotImplementedError();
    }

    static parse(match, str) {
        throw new NotImplementedError();
    }

    includes(val) {
        throw new NotImplementedError();
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
