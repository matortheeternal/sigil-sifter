import { Keyword } from 'sigil-sifter/keywords';
import SimpleStringExpression from '../expressions/SimpleStringExpression.js';
import { EqualsOperator, IncludesOperator } from 'sigil-sifter/operators';

export default class FrameKeyword extends Keyword {
    static get keys() {
        return ['frame'];
    }

    static get supportedOperators() {
        return [IncludesOperator, EqualsOperator];
    }

    static get supportedExpressions() {
        return [SimpleStringExpression];
    }

    test(card) {
        return super.test(card.frame)
            || card.frameEffects.some(fe => super.test(fe));
    }
}
