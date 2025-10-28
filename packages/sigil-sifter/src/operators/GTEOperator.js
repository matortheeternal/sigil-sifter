import Operator from './Operator.js';

export default class GTEOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^>=/);
    }

    static parse(sifter, match, str) {
        return new GTEOperator(sifter, match, str);
    }

    testValue(val, expression) {
        // tests val >= expression
        return expression.greaterThan(val) || expression.equals(val);
    }
}
