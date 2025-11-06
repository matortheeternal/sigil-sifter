import { SearchSyntaxError } from 'sigil-sifter/core';
import { StringExpression } from 'sigil-sifter/expressions';

export default class FormatExpression extends StringExpression {
    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.format = sifter.FormatExtension.resolveFormat(this.value);
        if (!this.format)
            throw new SearchSyntaxError('Unknown game format', match[0]);
    }

    includes(val) {
        return this.equals(val);
    }

    equals(val) {
        return this.format.expr.test(val);
    }
}
