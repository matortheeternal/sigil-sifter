import SearchSyntaxError from '../SearchSyntaxError.js';

function parseNext(str, supportedParsers) {
    for (const parser of supportedParsers) {
        const match = parser.match(str);
        if (match) return parser.parse(match, str);
    }
    throw new SearchSyntaxError('Could not find parser for', str);
}

export default class Keyword {
    static parse(str) {
        const operator = parseNext(str, this.supportedOperators);
        const expression = parseNext(
            operator.remainingStr,
            this.supportedExpressions
        );
        return new this(operator, expression);
    }

    constructor(operator, expression) {
        this.operator = operator;
        this.expression = expression;
        this.remainingStr = expression.remainingStr;
    }

    apply(filters) {
        filters.push(this);
    }

    test(value) {
        return this.operator.testValue(value, this.expression);
    }
}

