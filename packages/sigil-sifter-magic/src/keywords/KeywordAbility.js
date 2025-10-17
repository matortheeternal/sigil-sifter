import { Keyword } from 'sigil-sifter/keywords';
import KeywordAbilityExpression from '../expressions/KeywordAbilityExpression.js';

export default class KeywordAbility extends Keyword {
    static get supportedExpressions() {
        return [KeywordAbilityExpression];
    }

    static match(str) {
        return str === 'keyword' || str === 'kw';
    }

    test(obj) {
        return this.operator.testValue(obj.rulesText || '', this.expression);
    }
}
