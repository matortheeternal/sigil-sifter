import Operator from './Operator.js';

export default class LTEOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^<=/);
    }

    static parse(sifter, match, str) {
        return new LTEOperator(sifter, match, str);
    }

    testValue(val, expression) {
        // tests val <= expression
        return expression.lessThan(val) || expression.equals(val);
    }
}
