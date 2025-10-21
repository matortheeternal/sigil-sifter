import Operator from './Operator.js';

export default class LessThanOperator extends Operator {
    static match(str) {
        return str.match(/^</);
    }

    static parse(match, str) {
        return new LessThanOperator(match, str);
    }

    testValue(val, expression) {
        return expression.lessThan(val);
    }
}
