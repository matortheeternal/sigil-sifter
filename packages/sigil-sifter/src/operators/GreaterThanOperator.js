import Operator from './Operator.js';

export default class GreaterThanOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^>/);
    }

    static parse(sifter, match, str) {
        return new GreaterThanOperator(sifter, match, str);
    }

    testValue(val, expression) {
        // this is inverted because the expression comes second
        return expression.lessThan(val);
    }
}
