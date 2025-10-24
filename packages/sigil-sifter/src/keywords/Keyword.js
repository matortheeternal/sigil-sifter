import { Node, SearchSyntaxError, NotImplementedError } from '../core/index.js';
import {
    IncludesOperator, EqualsOperator, NotEqualOperator,
    GreaterThanOperator, LessThanOperator, GTEOperator, LTEOperator
} from '../operators/index.js';

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

    static parse(sifter, match, str) {
        const keyword = new this(sifter, match, str);
        keyword.operator = keyword.parseNext(this.supportedOperators);
        keyword.remainingStr = keyword.operator.remainingStr;
        keyword.expression = keyword.parseNext(this.supportedExpressions);
        keyword.remainingStr = keyword.expression.remainingStr;
        return keyword;
    }

    parseNext(parsers) {
        const str = this.remainingStr;
        for (const parser of parsers) {
            const match = parser.match(this.sifter, str);
            if (match) return parser.parse(this.sifter, match, str);
        }
        throw new SearchSyntaxError('Expected to parse ', str);
    }

    test(value) {
        return this.operator.testValue(value, this.expression);
    }
}

