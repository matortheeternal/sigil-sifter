import StringExpression from './StringExpression';

export default class KeywordExpression extends StringExpression {
    static parse(match, str) {
        return new KeywordExpression(match, str);
    }

    constructor(match, str) {
        super(match, str);
        this.expr = new RegExp(`(^${this.value}|\s${this.value})`, 'i');
    }

    includes(val) {
        return val.test(this.expr);
    }

    equals(val) {
        throw new SearchSyntaxError(
            'Keyword expressions do not support the equals operator',
            this.remainingStr
        );
    }

    greaterThan(val) {
        throw new SearchSyntaxError(
            'Keyword expressions do not support the greater than operator',
            this.remainingStr
        );
    }

    lessThan(val) {
        throw new SearchSyntaxError(
            'Keyword expressions do not support the less than operator',
            this.remainingStr
        );
    }
}
