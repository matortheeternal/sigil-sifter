import { Keyword } from 'sigil-sifter/keywords';
import RarityExpression from '../expressions/RarityExpression.js';

export default class RarityKeyword extends Keyword {
    static get keys() {
        return ['rarity', 'r'];
    }

    static get supportedExpressions() {
        return [RarityExpression];
    }

    test(card) {
        return super.test(card.rarity);
    }
}
