import Keyword from '../Keyword.js';
import { addKeywordClass } from '../../keywordRegistry.js';
import { ALL_OPERATORS } from '../../helpers.js';
import RarityExpression from '../../expressions/RarityExpression.js';

export default class Rarity extends Keyword {
    static get supportedOperators() {
        return ALL_OPERATORS;
    }

    static get supportedExpressions() {
        return [RarityExpression];
    }

    static match(str) {
        return str === 'rarity' || str === 'r';
    }

    test(obj) {
        return super.test(obj.rarity || '');
    }
}

addKeywordClass(Rarity);
