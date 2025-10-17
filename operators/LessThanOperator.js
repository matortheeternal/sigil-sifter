export default class LessThanOperator {
    static match(str) {
        return str.match(/^>/);
    }

    static parse(match, str) {
        return new LessThanOperator(match, str);
    }

    constructor(match, str) {
        this.remainingStr = str.slice(match[0].length);
    }

    testValue(val, expression) {
        return expression.lessThan(val);
    }
}
