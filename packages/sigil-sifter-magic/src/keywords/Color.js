import { Keyword } from 'sigil-sifter/keywords';
import ColorExpression from '../expressions/ColorExpression.js';

export default class Color extends Keyword {
    static get supportedExpressions() {
        return [ColorExpression];
    }

    static match(str) {
        return str === 'color' || str === 'c';
    }

    test(card) {
        const colors = card.colors.map(c => c.toLowerCase());
        return this.operator.testValue(colors, this.expression);
    }
}
