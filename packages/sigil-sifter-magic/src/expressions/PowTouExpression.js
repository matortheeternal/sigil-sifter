import { SearchSyntaxError } from 'sigil-sifter/core';
import { Expression } from 'sigil-sifter/expressions';

export default class PowTouExpression extends Expression {
    static match(str) {
        return str.match(/^(pow(er)?|tou(ghness)?)/i);
    }

    static parse(match, str) {
        return new PowTouExpression(match, str);
    }

    constructor(match, str) {
        super(match, str);
        const key = match[1].toLowerCase();
        this.powerMode = key === 'pow' || key === 'power';
    }

    includes() {
        throw new SearchSyntaxError(
            'Includes operator is not supported for pow/tou expressions, ' +
            'use a comparison or equality operator instead.'
        );
    }

    equals({ power, toughness }) {
        return power === toughness;
    }

    greaterThan({ power, toughness }) {
        return this.powerMode
            ? toughness > power
            : power > toughness;
    }

    lessThan({ power, toughness }) {
        return this.powerMode
            ? toughness < power
            : power < toughness;
    }
}
