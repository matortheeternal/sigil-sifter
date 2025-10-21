import Operator from './Operator.js';

export default class NotEqualOperator extends Operator {
    static match(str) {
        return str.match(/^(!=|<>)/);
    }

    static parse(match, str) {
        return new NotEqualOperator(match, str);
    }

    testValue(val, expression) {
        return !expression.equals(val);
    }
}
