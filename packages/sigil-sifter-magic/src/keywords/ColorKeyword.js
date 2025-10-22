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
        const colors = card.colors.map(c => c.toLowerCase());
        return this.operator.testValue(colors, this.expression);
    }
}
