import { Keyword } from 'sigil-sifter/keywords';
import { ManaCost } from 'mana-scribe';
import DevotionExpression from '../expressions/DevotionExpression.js';

export default class DevotionKeyword extends Keyword {
    static get keys() {
        return  ['devotion'];
    }

    static get supportedExpressions() {
        return [DevotionExpression];
    }

    test(card) {
        if (!card.isPermanent) return false;
        const manaCosts = card.cache('manaCosts', () => {
            return card.manaCosts.map(costStr => ManaCost.parse(costStr));
        });
        return manaCosts.some(manaCost => super.test(manaCost));
    }
}
