import { Keyword } from 'sigil-sifter/keywords';
import BooleanExpression from './BooleanExpression.js';

export default class SoldKeyword extends Keyword {
    static get keys() {
        return  ['sold'];
    }

    static get supportedExpressions() {
        return [BooleanExpression];
    }

    test(item) {
        return super.test(item.sold);
    }
}
