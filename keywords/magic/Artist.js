import Keyword from '../Keyword.js';
import { addKeywordClass } from '../../keywordRegistry.js';
import { ALL_OPERATORS, STRING_EXPRESSIONS } from '../../helpers.js';

export default class Artist extends Keyword {
    static get supportedOperators() {
        return ALL_OPERATORS;
    }

    static get supportedExpressions() {
        return STRING_EXPRESSIONS;
    }

    static match(str) {
        return str === 'artist' || str === 'a';
    }

    test(obj) {
        return super.test(obj.illustrator) || super.test(obj.illustrator2);
    }
}

addKeywordClass(Artist);
