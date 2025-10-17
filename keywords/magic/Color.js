import Keyword from '../Keyword.js';
import { addKeywordClass } from '../../keywordRegistry.js';
import { ALL_OPERATORS } from '../../helpers.js';
import ColorExpression from '../../expressions/ColorExpression.js';

export default class Color extends Keyword {
    static get supportedOperators() {
        return ALL_OPERATORS;
    }

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

addKeywordClass(Color);
