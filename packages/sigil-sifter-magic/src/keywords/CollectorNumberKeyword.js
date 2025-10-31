import { NumericExpression } from 'sigil-sifter/expressions';
import { Keyword } from 'sigil-sifter/keywords';

export default class CollectorNumberKeyword extends Keyword {
    static get keys() {
        return ['number', 'cn'];
    }

    static get supportedExpressions() {
        return [NumericExpression];
    }

    test(card) {
        return super.test(card.collectorNumber);
    }
}
