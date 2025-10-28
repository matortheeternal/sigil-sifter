import { Keyword } from 'sigil-sifter/keywords';
import { ManaCost } from 'mana-scribe';
import ManaExpression from '../expressions/ManaExpression.js';

export default class ManaCostKeyword extends Keyword {
    static get keys() {
        return  ['mana', 'm'];
    }

    static get supportedExpressions() {
        return [ManaExpression];
    }

    test(card) {
        const manaCosts = card.cache('manaCosts', () => {
            return card.manaCosts.map(costStr => ManaCost.parse(costStr));
        });
        return manaCosts.some(manaCost => super.test(manaCost));
    }
}
