export default class LoyaltyKeyword extends Keyword {
    static get supportedExpressions() {
        return [NumericExpression];
    }

    static match(str) {
        return str === 'loyalty'
            || str === 'loy';
    }

    test(card) {
        return card.loyalties.some(loy => super.test(loy));
    }
}
