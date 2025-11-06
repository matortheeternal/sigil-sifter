import { Keyword } from 'sigil-sifter/keywords';
import ExactStringExpression from '../expressions/ExactStringExpression.js';
import { EqualsOperator, IncludesOperator } from 'sigil-sifter/operators';

export default class StampKeyword extends Keyword {
    static get keys() {
        return ['stamp'];
    }

    static get supportedOperators() {
        return [IncludesOperator, EqualsOperator];
    }

    static get supportedExpressions() {
        return [ExactStringExpression];
    }

    test(card) {
        return super.test(card.stamp);
    }
}
