import { Expression } from 'sigil-sifter/expressions';

export default class ProducesCountExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^[0-5]/);
    }

    static parse(sifter, match, str) {
        return new this(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.value = parseInt(match[0]);
    }

    includes(val) {
        return this.equals(val);
    }

    equals(val) {
        return val.length === this.value;
    }

    greaterThan(val) {
        return val.length > this.value;
    }

    lessThan(val) {
        return val.length < this.value;
    }
}
