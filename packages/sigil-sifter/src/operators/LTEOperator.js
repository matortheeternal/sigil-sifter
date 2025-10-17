import Operator from './Operator.js';

export default class LTEOperator extends Operator {
    static match(str) {
        return str.match(/^<=/);
    }

    static parse(match, str) {
        return new LTEOperator(match, str);
    }

    testValue(val, expression) {
        return expression.lessThan(val) || expression.equals(val);
    }
}
