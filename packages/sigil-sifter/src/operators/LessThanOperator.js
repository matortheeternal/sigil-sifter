import Operator from './Operator.js';

export default class LessThanOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^</);
    }

    static parse(sifter, match, str) {
        return new LessThanOperator(sifter, match, str);
    }

    testValue(val, expression) {
        return expression.greaterThan(val);
    }
}
