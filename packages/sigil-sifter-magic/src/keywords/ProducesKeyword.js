import { Keyword } from 'sigil-sifter/keywords';
import ProducesExpression from '../expressions/ProducesExpression.js';
import ProducesCountExpression from '../expressions/ProducesCountExpression.js';

export default class ProducesKeyword extends Keyword {
    static get keys() {
        return ['produces'];
    }

    static get supportedExpressions() {
        return [ProducesExpression, ProducesCountExpression];
    }

    test(card) {
        return this.operator.testValue(card.produces, this.expression);
    }
}
