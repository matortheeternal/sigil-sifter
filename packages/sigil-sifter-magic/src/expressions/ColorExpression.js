import { Expression } from 'sigil-sifter/expressions';

export default class ColorExpression extends Expression {
    static match(sifter, str) {
        return str.match(sifter.ColorExtension.colorNamesExpr)
            || str.match(/^([wubrgc]+)/i);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.value = match[0];
        this.colors = sifter.ColorExtension.resolveColors(this.value);
        this.colorless = this.colors.includes('C');
        if (this.colorless && this.colors.length > 1)
            throw new Error('A card cannot be both colorless and colored.');
    }

    includes(val) {
        if (this.colorless) return val.length === 0;
        return this.colors.every(c => val.includes(c));
    }

    equals(val) {
        if (this.colorless) return val.length === 0;
        return val.length === this.colors.length
            && val.every(c => this.colors.includes(c));
    }

    greaterThan(val) {
        if (this.colorless) return val.length > 0;
        return val.length > this.colors.length
            && this.colors.every(c => val.includes(c));
    }

    lessThan(val) {
        if (this.colorless) return false;
        return val.length < this.colors.length
            && val.every(c => this.colors.includes(c));
    }
}
