import Operator from './Operator.js';

export default class GreaterThanOperator extends Operator {
    static match(str) {
        return str.match(/^>/);
    }

    static parse(match, str) {
        return new GreaterThanOperator(match, str);
    }

    testValue(val, expression) {
        return expression.greaterThan(val);
    }
}
