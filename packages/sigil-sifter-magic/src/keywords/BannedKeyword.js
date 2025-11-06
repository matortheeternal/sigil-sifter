import { Keyword } from 'sigil-sifter/keywords';
import FormatExpression from '../expressions/FormatExpression.js';
import { EqualsOperator, IncludesOperator } from 'sigil-sifter/operators';

export default class BannedKeyword extends Keyword {
    static get keys() {
        return ['banned'];
    }

    static get supportedOperators() {
        return [IncludesOperator, EqualsOperator];
    }

    static get supportedExpressions() {
        return [FormatExpression];
    }

    test(card) {
        return card.banned.some(formatName => super.test(formatName));
    }
}
