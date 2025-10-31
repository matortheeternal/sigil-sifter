import { Keyword } from 'sigil-sifter/keywords';
import { IncludesOperator } from 'sigil-sifter/operators';
import * as booleanExpressions from '../expressions/is/index.js';

export default class NotKeyword extends Keyword {
    static get keys() {
        return ['not'];
    }

    static get supportedOperators() {
        return [IncludesOperator];
    }

    static get supportedExpressions() {
        return Object.values(booleanExpressions);
    }

    test(card) {
        return !super.test(card);
    }
}
