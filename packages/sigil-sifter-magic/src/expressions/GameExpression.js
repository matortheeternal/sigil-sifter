import { SearchSyntaxError } from 'sigil-sifter/core';
import { StringExpression } from 'sigil-sifter/expressions';

export default class GameExpression extends StringExpression {
    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.game = sifter.GameExtension.resolveGame(this.value);
        if (!this.game)
            throw new SearchSyntaxError('Unknown game', match[0]);
    }

    includes(val) {
        return val.some(g => this.game.expr.test(g));
    }

    equals(val) {
        return this.includes(val);
    }
}
