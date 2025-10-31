import { Keyword } from 'sigil-sifter/keywords';
import ColorExpression from '../expressions/ColorExpression.js';
import ArrayLengthExpression from '../expressions/ArrayLengthExpression.js';

export default class ColorKeyword extends Keyword {
    static get keys() {
        return ['colors', 'color', 'c'];
    }

    static get supportedExpressions() {
        return [ColorExpression, ArrayLengthExpression];
    }

    test(card) {
        return this.operator.testValue(card.colors, this.expression);
    }
}
