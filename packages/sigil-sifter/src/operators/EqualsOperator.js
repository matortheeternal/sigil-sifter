import Operator from './Operator.js';

export default class EqualsOperator extends Operator {
    static match(str) {
        return str.match(/^=/);
    }

    static parse(match, str) {
        return new EqualsOperator(match, str);
    }

    testValue(val, expression) {
        return expression.equals(val);
    }
}
