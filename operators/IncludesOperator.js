export default class IncludesOperator {
    static match(str) {
        return str.match(/^:/);
    }

    static parse(match, str) {
        return new IncludesOperator(match, str);
    }

    constructor(match, str) {
        if (!match) return;
        this.remainingStr = str.slice(match[0].length);
    }

    testValue(val, expression) {
        return expression.includes(val);
    }
}
