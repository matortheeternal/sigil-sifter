import Operator from './Operator.js';

export default class IncludesOperator extends Operator {
    static match(str) {
        return str.match(/^:/);
    }

    static parse(match, str) {
        return new IncludesOperator(match, str);
    }

    testValue(val, expression) {
        return expression.includes ? expression.includes(val) : expression.equals(val);
    }
}
