import { Keyword } from 'sigil-sifter/keywords';
import { NumericExpression } from 'sigil-sifter/expressions';

export default class PriceKeyword extends Keyword {
    static get keys() {
        return  ['price', '$'];
    }

    static get supportedExpressions() {
        return [NumericExpression];
    }

    test(item) {
        return super.test(item.price);
    }
}
