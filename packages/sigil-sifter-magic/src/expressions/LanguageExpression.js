import { SearchSyntaxError } from 'sigil-sifter/core';
import { StringExpression } from 'sigil-sifter/expressions';

export default class LanguageExpression extends StringExpression {
    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.value = match[1];
        this.language = sifter.LanguageExtension.resolveLanguage(this.value);
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
