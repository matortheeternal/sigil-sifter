import { Expression } from 'sigil-sifter/expressions';
import { getColors, matchColorNames } from '../core/colors.js';

export default class ColorExpression extends Expression {
    static match(str) {
        return str.match(/^([wubrgc]+)/i) || matchColorNames(str);
    }

    static parse(match, str) {
        return new ColorExpression(match, str);
    }

    constructor(match, str) {
        super(match, str);
        this.value = match[1];
        this.colors = getColors(this.value);
        if (this.colors.includes('C') && this.colors.length > 1)
            throw new Error('A card cannot be both colorless and colored.');
    }

    includes(val) {
        return this.colors.every(c => val.includes(c));
    }

    equals(val) {
        return val.length === this.colors.length
            && val.every(c => this.colors.includes(c));
    }

    greaterThan(val) {
        return val.length > this.colors.length
            && this.colors.every(c => val.includes(c));
    }

    lessThan(val) {
        return val.length < this.colors.length
            && val.every(c => this.colors.includes(c));
    }
}
