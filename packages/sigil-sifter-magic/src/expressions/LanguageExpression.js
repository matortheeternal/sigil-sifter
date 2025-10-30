import { SearchSyntaxError } from 'sigil-sifter/core';
import { StringExpression } from 'sigil-sifter/expressions';
import { getLanguage } from '../core/languages.js';

export default class LanguageExpression extends StringExpression {
    static parse(sifter, match, str) {
        return new this(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.value = match[1];
        this.language = getLanguage(this.value);
        if (!this.language)
            throw new SearchSyntaxError('Unknown language', this.value);
    }

    includes(val) {
        return this.equals(val);
    }

    equals(val) {
        return val === this.language.acronyms[0];
    }

    greaterThan(val) {
        throw new SearchSyntaxError(
            'Comparison operators are not supported for language ' +
            'expressions, use the includes operator (\':\') instead.'
        );
    }

    lessThan(val) {
        throw new SearchSyntaxError(
            'Comparison operators are not supported for language ' +
            'expressions, use the includes operator (\':\') instead.'
        );
    }
}
