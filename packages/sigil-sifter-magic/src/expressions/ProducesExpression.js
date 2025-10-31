import { Expression } from 'sigil-sifter/expressions';

export default class ProducesExpression extends Expression {
    static match(sifter, str) {
        return str.match(sifter.ColorExtension.colorNamesExpr)
            || str.match(/^([wubrgc]+)/i);
    }

    static parse(sifter, match, str) {
        return new this(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.value = match[0];
        this.colors = sifter.ColorExtension.resolveColors(this.value);
    }

    includes(val) {
        return this.colors.every(c => val.includes(c));
    }

    equals(val) {
        return val.length === this.colors.length && this.includes(val);
    }

    greaterThan(val) {
        return val.length > this.colors.length && this.includes(val);
    }

    lessThan(val) {
        return val.length < this.colors.length
            && val.every(c => this.colors.includes(c));
    }
}
