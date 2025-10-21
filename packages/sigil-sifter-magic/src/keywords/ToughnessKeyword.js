import PowTouExpression from '../expressions/PowTouExpression.js';
import { comparingPtAgainst } from '../core/helpers.js';

export default class ToughnessKeyword extends Keyword {
    static get supportedExpressions() {
        return [NumericExpression, PowTouExpression];
    }

    static match(str) {
        return str === 'toughness'
            || str === 'tou';
    }

    constructor(operator, expression) {
        super(operator, expression);
        if (comparingPtAgainst(expression, 'toughness'))
            throw new SearchSyntaxError('Cannot compare toughness against itself.');
    }

    test(card) {
        return card.pts.some(pt => super.test(pt));
    }
}
