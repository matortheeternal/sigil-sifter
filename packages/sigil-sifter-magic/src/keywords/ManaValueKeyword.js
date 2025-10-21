import { NumericExpression } from 'sigil-sifter/expressions';
import EvenOddExpression from '../expressions/EvenOddExpression.js';

export default class ManaValueKeyword extends Keyword {
    static get supportedExpressions() {
        return [NumericExpression, EvenOddExpression];
    }

    static match(str) {
        return str === 'manavalue'
            || str === 'mv'
            || str === 'cmc';
    }

    test(card) {
        return card.manaValues.some(mv => super.test(mv));
    }
}
