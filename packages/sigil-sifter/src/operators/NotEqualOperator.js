import Operator from './Operator.js';

export default class NotEqualOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^(!=|<>)/);
    }

    static parse(sifter, match, str) {
        return new NotEqualOperator(sifter, match, str);
    }

    testValue(val, expression) {
        return !expression.equals(val);
    }
}
