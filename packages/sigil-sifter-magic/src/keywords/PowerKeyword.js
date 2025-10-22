import { Keyword } from 'sigil-sifter/keywords';
import PowTouExpression from '../expressions/PowTouExpression.js';
import { comparingPtAgainst } from '../core/helpers.js';

export default class PowerKeyword extends Keyword {
    static get keys() {
        return ['power', 'pow'];
    }

    static get supportedExpressions() {
        return [NumericExpression, PowTouExpression];
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
