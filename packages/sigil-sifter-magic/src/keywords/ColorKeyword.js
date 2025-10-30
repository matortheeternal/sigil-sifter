import { Keyword } from 'sigil-sifter/keywords';
import ColorExpression from '../expressions/ColorExpression.js';

export default class ColorKeyword extends Keyword {
    static get keys() {
        return ['color', 'c'];
    }

    static get supportedExpressions() {
        return [ColorExpression];
    }

    test(card) {
        return this.operator.testValue(card.colors, this.expression);
    }
}
