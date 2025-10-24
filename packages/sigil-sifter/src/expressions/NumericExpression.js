import Expression from './Expression.js';

export default class NumericExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^(\d+)/);
    }

    static parse(sifter, match, str) {
        return new NumericExpression(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.value = parseInt(match[1], 10);
    }

    includes(val) {
        return this.equals(val);
    }

    equals(val) {
        return val === this.value;
    }

    greaterThan(val) {
        return this.value > val;
    }

    lessThan(val) {
        return this.value < val;
    }
}
