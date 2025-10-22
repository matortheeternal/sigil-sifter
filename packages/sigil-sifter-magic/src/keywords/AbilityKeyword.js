import { Keyword } from 'sigil-sifter/keywords';
import KeywordAbilityExpression from '../expressions/KeywordAbilityExpression.js';

export default class AbilityKeyword extends Keyword {
    static get keys() {
        return ['keyword', 'kw'];
    }

    static get supportedExpressions() {
        return [KeywordAbilityExpression];
    }

    test(card) {
        return card.rulesTexts.some(rulesText => {
            return this.operator.testValue(rulesText, this.expression);
        });
    }
}
