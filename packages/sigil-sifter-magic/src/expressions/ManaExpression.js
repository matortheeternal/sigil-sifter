import { StringExpression } from 'sigil-sifter/expressions';
import {SearchSyntaxError} from 'sigil-sifter/core';
import { ManaCost } from 'mana-scribe';

export default class ManaExpression extends StringExpression {
    static parse(sifter, match, str) {
        return new ManaExpression(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.searchManaCost = ManaCost.parse(this.value);
        const unparsedManaCost = this.searchManaCost.remainingStr;
        if (unparsedManaCost.length > 0)
            throw new SearchSyntaxError(
                'Failed to parse mana cost',
                unparsedManaCost
            );
    }

    includes(val) {
        return this.greaterThan(val) || this.equals(val);
    }

    equals(val) {
        return val.equals(this.searchManaCost);
    }

    greaterThan(val) {
        return val.greaterThan(this.searchManaCost);
    }

    lessThan(val) {
        return val.lessThan(this.searchManaCost);
    }
}
