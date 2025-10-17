import Keyword from './Keyword.js';
import { ALL_OPERATORS, STRING_EXPRESSIONS } from '../helpers.js';

export default class StringKeyword extends Keyword {
    static get supportedOperators() {
        return ALL_OPERATORS;
    }

    static get supportedExpressions() {
        return STRING_EXPRESSIONS;
    }

    test(value) {
        return this.operator.testString(value, this.expression);
    }
}
