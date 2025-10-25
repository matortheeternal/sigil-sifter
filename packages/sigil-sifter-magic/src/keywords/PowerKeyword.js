import { SearchSyntaxError } from 'sigil-sifter/core';
import { NumericExpression } from 'sigil-sifter/expressions';
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

    static parse(sifter, match, str) {
        const keyword = super.parse(sifter, match, str);
        if (comparingPtAgainst(keyword.expression, 'power'))
            throw new SearchSyntaxError('Cannot compare power against itself.');
        return keyword;
    }

    test(card) {
        if (this.expression.constructor === PowTouExpression)
            return card.pts.some(pt => super.test(pt));

        return card.pts.some(pt => super.test(pt.power));
    }
}
