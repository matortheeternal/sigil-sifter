import Expression from './Expression.js';

function strIfNum(val) {
    return typeof val === 'number' ? val.toString() : val;
}

export default class StringExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^"((?:[^"\\]|\\.)*)"/)
            || str.match(/^([^\s)]+)/);
    }

    static parse(sifter, match, str) {
        return new this(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.value = match[1].toLowerCase();
    }

    includes(val) {
        return val.toLowerCase().includes(this.value);
    }

    equals(val) {
        return strIfNum(val).toLowerCase() === this.value;
    }

    greaterThan(val) {
        throw new SearchSyntaxError(
            'String expressions do not support the greater than operator'
        );
    }

    lessThan(val) {
        throw new SearchSyntaxError(
            'String expressions do not support the less than operator'
        );
    }
}
