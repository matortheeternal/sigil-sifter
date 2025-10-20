import { Expression } from 'sigil-sifter/expressions';
import { getColors, matchColorNames } from '../core/colors.js';

export default class ColorExpression extends Expression {
    static match(str) {
        return matchColorNames(str) || str.match(/^([wubrgc]+)/i);
    }

    static parse(match, str) {
        return new ColorExpression(match, str);
    }

    constructor(match, str) {
        super(match, str);
        this.value = match[1].toLowerCase();
        this.colors = getColors(this.value);
        this.colorless = this.colors.includes('c');
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
