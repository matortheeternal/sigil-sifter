import { Keyword } from 'sigil-sifter/keywords';
import { NumericExpression } from 'sigil-sifter/expressions';

export default class LoyaltyKeyword extends Keyword {
    static get keys() {
        return ['loyalty', 'loy'];
    }

    static get supportedExpressions() {
        return [NumericExpression];
    }

    test(card) {
        return super.test(card.loyalty);
    }
}
