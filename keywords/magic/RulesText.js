import Keyword from '../Keyword.js';
import { addKeywordClass } from '../../keywordRegistry.js';
import { ALL_OPERATORS, STRING_EXPRESSIONS } from '../../helpers.js';

export default class RulesText extends Keyword {
    static get supportedOperators() {
        return ALL_OPERATORS;
    }

    static get supportedExpressions() {
        return STRING_EXPRESSIONS;
    }

    static match(str) {
        return str === 'o' || str === 'oracle';
    }

    test(obj) {
        return super.test(obj.rulesText);
    }
}

addKeywordClass(RulesText);
