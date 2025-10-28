import Operator from './Operator.js';

export default class GreaterThanOperator extends Operator {
    static match(sifter, str) {
        return str.match(/^>/);
    }

    static parse(sifter, match, str) {
        return new GreaterThanOperator(sifter, match, str);
    }

    testValue(val, expression) {
        // tests val > expression
        return expression.greaterThan(val);
    }
}
