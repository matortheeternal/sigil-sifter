import Operator from './Operator.js';

export default class IncludesOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^:/);
    }

    static parse(sifter, match, str) {
        return new IncludesOperator(sifter, match, str);
    }

    testValue(val, expression) {
        return expression.includes ? expression.includes(val) : expression.equals(val);
    }
}
