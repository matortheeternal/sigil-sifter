import Expression from './Expression.js';

export default class NumericExpression extends Expression {
    static match(str) {
        return str.match(/^(\d+)/);
    }

    static parse(match, str) {
        return new NumericExpression(match, str);
    }

    constructor(match, str) {
        super(match, str);
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
