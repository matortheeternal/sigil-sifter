import { Keyword } from 'sigil-sifter/keywords';
import RarityExpression from '../expressions/RarityExpression.js';

export default class Rarity extends Keyword {
    static get supportedExpressions() {
        return [RarityExpression];
    }

    static match(str) {
        return str === 'rarity' || str === 'r';
    }

    test(card) {
        return super.test(card.rarity);
    }
}
