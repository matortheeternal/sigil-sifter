import Operator from './Operator.js';

export default class GTEOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^>=/);
    }

    static parse(sifter, match, str) {
        return new GTEOperator(sifter, match, str);
    }

    testValue(val, expression) {
        return expression.lessThan(val) || expression.equals(val);
    }
}
