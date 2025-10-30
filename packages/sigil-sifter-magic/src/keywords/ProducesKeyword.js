import { Keyword } from 'sigil-sifter/keywords';
import ProducesExpression from '../expressions/ProducesExpression.js';

export default class ProducesKeyword extends Keyword {
    static get keys() {
        return ['produces'];
    }

    static get supportedExpressions() {
        return [ProducesExpression];
    }

    test(card) {
        return this.operator.testValue(card.produces, this.expression);
    }
}
