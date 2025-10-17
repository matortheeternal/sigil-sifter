export default class NumericExpression {
    static match(str) {
        return str.match(/^(\d+)/);
    }

    static parse(match, str) {
        return new NumericExpression(match, str);
    }

    constructor(match, str) {
        this.value = parseInt(match[1], 10);
        this.remainingStr = str.slice(match[0].length);
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
