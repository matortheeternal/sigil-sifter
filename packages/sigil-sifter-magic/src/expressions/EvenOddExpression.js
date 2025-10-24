import { SearchSyntaxError } from 'sigil-sifter/core';
import { Expression } from 'sigil-sifter/expressions';

export default class EvenOddExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^(even|odd)/i);
    }

    static parse(sifter, match, str) {
        return new EvenOddExpression(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        const isOdd = match[1].toLowerCase() === 'odd';
        this.expectedRemainder = isOdd ? 1 : 0;
    }

    includes(val) {
        return (val % 2) === this.expectedRemainder;
    }

    equals(val) {
        throw new SearchSyntaxError(
            'Equality operators are not supported for even/odd ' +
            'expressions, use the includes operator (\':\') instead.'
        );
    }

    greaterThan(val) {
        throw new SearchSyntaxError(
            'Comparison operators are not supported for even/odd ' +
            'expressions, use the includes operator (\':\') instead.'
        );
    }

    lessThan(val) {
        throw new SearchSyntaxError(
            'Comparison operators are not supported for even/odd ' +
            'expressions, use the includes operator (\':\') instead.'
        );
    }
}
