export default class RegExpression {
    static match(str) {
        return str.match(/^\/(.*?)(?<!\\)\//);
    }

    static parse(match, str) {
        return new RegExpression(match, str);
    }

    constructor(match, str) {
        this.remainingStr = str.slice(match[0].length);
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
