export default class NotEqualOperator {
    static match(str) {
        return str.match(/^(!=|<>)/);
    }

    static parse(match, str) {
        return new NotEqualOperator(match, str);
    }

    constructor(match, str) {
        this.remainingStr = str.slice(match[0].length);
    }

    testValue(val, expression) {
        return !expression.equals(val);
    }
}
