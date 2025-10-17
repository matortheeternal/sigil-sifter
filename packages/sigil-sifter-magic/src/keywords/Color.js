import { Keyword } from 'sigil-sifter/keywords';
import ColorExpression from '../expressions/ColorExpression.js';

export default class Color extends Keyword {
    static get supportedExpressions() {
        return [ColorExpression];
    }

    static match(str) {
        return str === 'color' || str === 'c';
    }

    test(obj) {
        return this.operator.testValue(obj.colors || [], this.expression);
    }
}
