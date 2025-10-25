import { Expression } from 'sigil-sifter/expressions';

function parseBool(str) {
    const lcStr = str.toLowerCase();
    return lcStr === '1'
        || lcStr === 'true'
        || lcStr === 't';
}

export default class BooleanExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^(1|0|true|false|T|F)/i);
    }

    static parse(sifter, match, str) {
        return new BooleanExpression(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.value = parseBool(match[1]);
    }

    includes(val) {
        return this.value === val;
    }

    equals(val) {
        throw new NotImplementedError();
    }

    greaterThan(val) {
        throw new NotImplementedError();
    }

    lessThan(val) {
        throw new NotImplementedError();
    }
}
