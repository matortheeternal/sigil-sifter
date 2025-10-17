import Expression from './Expression.js';

export default class RegExpression extends Expression {
    static match(str) {
        return str.match(/^\/(.*?)(?<!\\)\//);
    }

    static parse(match, str) {
        return new RegExpression(match, str);
    }

    constructor(match, str) {
        super(match, str);
        this.value = new RegExp(match[1], 'i');
    }

    includes(val) {
        return this.value.test(val);
    }

    equals(val) {
        return this.includes(val);
    }

    greaterThan() {
        throw new Error('Cannot user greater than with a regular expression');
    }

    lessThan() {
        throw new Error('Cannot user less than with a regular expression');
    }
}
