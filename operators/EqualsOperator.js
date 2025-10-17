export default class EqualsOperator {
    static match(str) {
        return str.match(/^=/);
    }

    static parse(match, str) {
        return new EqualsOperator(match, str);
    }

    constructor(match, str) {
        if (!match) return;
        this.remainingStr = str.slice(match[0].length);
    }

    testValue(val, expression) {
        return expression.equals(val);
    }
}
