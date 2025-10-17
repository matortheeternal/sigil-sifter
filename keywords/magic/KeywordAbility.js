import Keyword from '../Keyword.js';
import { addKeywordClass } from '../../keywordRegistry.js';
import { ALL_OPERATORS } from '../../helpers.js';
import KeywordExpression from '../../expressions/KeywordExpression';

export default class KeywordAbility extends Keyword {
    static get supportedOperators() {
        return ALL_OPERATORS;
    }

    static get supportedExpressions() {
        return [KeywordExpression];
    }

    static match(str) {
        return str === 'keyword' || str === 'kw';
    }

    test(obj) {
        return this.operator.testValue(obj.rulesText || '', this.expression);
    }
}

addKeywordClass(KeywordAbility);
