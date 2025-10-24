import Operator from './Operator.js';

export default class EqualsOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^=/);
    }

    static parse(sifter, match, str) {
        return new EqualsOperator(sifter, match, str);
    }

    testValue(val, expression) {
        return expression.equals(val);
    }
}
