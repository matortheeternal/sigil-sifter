import { Keyword } from 'sigil-sifter/keywords';
import KeywordAbilityExpression from '../expressions/KeywordAbilityExpression.js';

export default class AbilityKeyword extends Keyword {
    static get supportedExpressions() {
        return [KeywordAbilityExpression];
    }

    static match(str) {
        return str === 'keyword' || str === 'kw';
    }

    test(card) {
        return card.rulesTexts.some(rulesText => {
            return this.operator.testValue(rulesText, this.expression);
        });
    }
}
