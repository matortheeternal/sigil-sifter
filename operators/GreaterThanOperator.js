export default class GreaterThanOperator {
    static match(str) {
        return str.match(/^>/);
    }

    static parse(match, str) {
        return new GreaterThanOperator(match, str);
    }

    constructor(match, str) {
        this.remainingStr = str.slice(match[0].length);
    }

    testValue(val, expression) {
        return expression.greaterThan(val);
    }
}
