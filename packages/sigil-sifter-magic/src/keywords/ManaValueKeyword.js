import { Keyword } from 'sigil-sifter/keywords';
import { NumericExpression } from 'sigil-sifter/expressions';
import EvenOddExpression from '../expressions/EvenOddExpression.js';

export default class ManaValueKeyword extends Keyword {
    static get keys() {
        return  ['manavalue', 'mv', 'cmc'];
    }

    static get supportedExpressions() {
        return [NumericExpression, EvenOddExpression];
    }

    test(card) {
        return card.manaValues.some(mv => super.test(mv));
    }
}
