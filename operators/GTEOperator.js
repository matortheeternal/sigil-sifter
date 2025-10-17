export default class GTEOperator {
    static match(str) {
        return str.match(/^>=/);
    }

    static parse(match, str) {
        return new GTEOperator(match, str);
    }

    constructor(match, str) {
        this.remainingStr = str.slice(match[0].length);
    }

    testValue(val, expression) {
        return expression.greaterThan(val) || expression.equals(val);
    }
}
