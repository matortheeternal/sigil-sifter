import Keyword from '../Keyword.js';
import { addKeywordClass } from '../../keywordRegistry.js';
import { ALL_OPERATORS, STRING_EXPRESSIONS } from '../../helpers.js';

export default class CardType extends Keyword {
    static get supportedOperators() {
        return ALL_OPERATORS;
    }

    static get supportedExpressions() {
        return STRING_EXPRESSIONS;
    }

    static match(str) {
        return str === 'type' || str === 't';
    }

    test(obj) {
        return super.test(obj.superType || '')
            || super.test(obj.subType || '');
    }
}

addKeywordClass(CardType);
