import { Keyword } from 'sigil-sifter/keywords';
import GameExpression from '../expressions/GameExpression.js';
import { EqualsOperator, IncludesOperator } from 'sigil-sifter/operators';

export default class GameKeyword extends Keyword {
    static get keys() {
        return ['game'];
    }

    static get supportedOperators() {
        return [IncludesOperator, EqualsOperator];
    }

    static get supportedExpressions() {
        return [GameExpression];
    }

    test(card) {
        return super.test(card.games);
    }
}
