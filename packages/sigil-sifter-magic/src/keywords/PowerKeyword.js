import PowTouExpression from '../expressions/PowTouExpression.js';
import { comparingPtAgainst } from '../core/helpers.js';

export default class PowerKeyword extends Keyword {
    static get supportedExpressions() {
        return [NumericExpression, PowTouExpression];
    }

    static match(str) {
        return str === 'power'
            || str === 'pow';
    }

    constructor(operator, expression) {
        super(operator, expression);
        if (comparingPtAgainst(expression, 'power'))
            throw new SearchSyntaxError('Cannot compare power against itself.');
    }

    test(card) {
        return card.pts.some(pt => super.test(pt));
    }
}
