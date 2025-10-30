import { Keyword } from 'sigil-sifter/keywords';
import LanguageExpression from '../expressions/LanguageExpression.js';

export default class LanguageKeyword extends Keyword {
    static get keys() {
        return ['language', 'lang'];
    }

    static get supportedExpressions() {
        return [LanguageExpression];
    }

    test(card) {
        return super.test(card.language);
    }
}
