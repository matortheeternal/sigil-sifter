import { Keyword } from 'sigil-sifter/keywords';

export default class LoyaltyKeyword extends Keyword {
    static get keys() {
        return ['loyalty', 'loy'];
    }

    static get supportedExpressions() {
        return [NumericExpression];
    }

    test(card) {
        return card.loyalties.some(loy => super.test(loy));
    }
}
