import { Node, SearchSyntaxError, NotImplementedError } from '../core/index.js';
import {
    IncludesOperator, EqualsOperator, NotEqualOperator,
    GreaterThanOperator, LessThanOperator, GTEOperator, LTEOperator
} from '../operators/index.js';

function parseNext(str, supportedParsers) {
    for (const parser of supportedParsers) {
        const match = parser.match(str);
        if (match) return parser.parse(match, str);
    }
    throw new SearchSyntaxError('Could not find parser for', str);
}

export default class Keyword extends Node {
    static get supportedOperators() {
        return [
            IncludesOperator, EqualsOperator, NotEqualOperator,
            GTEOperator, LTEOperator, GreaterThanOperator, LessThanOperator,
        ];
    }

    static get supportedExpressions() {
        throw new NotImplementedError();
    }

    static get keys() {
        throw new NotImplementedError();
    }

    static parse(str) {
        const operator = parseNext(str, this.supportedOperators);
        const expression = parseNext(
            operator.remainingStr,
            this.supportedExpressions
        );
        return new this(operator, expression);
    }

    constructor(operator, expression) {
        super();
        this.operator = operator;
        this.expression = expression;
        this.remainingStr = expression.remainingStr;
    }

    test(value) {
        return this.operator.testValue(value, this.expression);
    }
}

