import StringExpression from '../expressions/StringExpression.js';
import EndNestedGroupParser from './EndNestedGroupParser.js';
import KeywordFilterParser from './KeywordFilterParser.js';
import NestedGroupParser from './NestedGroupParser.js';
import NegateParser from './NegateParser.js';
import ExactParser from './ExactParser.js';
import OrParser from './OrParser.js';
import Parser from './Parser.js';

const BINARY_OPERATOR_PARSERS = { 'o': OrParser };
const END_NESTING_PARSERS = { ')': EndNestedGroupParser };

export default class GroupParser extends Parser {
    static getParsersToTry({ binaryOperators, nested }) {
        return {
            '-': NegateParser,
            '!': ExactParser,
            '(': NestedGroupParser,
            ...(binaryOperators && BINARY_OPERATOR_PARSERS),
            ...(nested && END_NESTING_PARSERS),
            default: [
                KeywordFilterParser,
                StringExpression
            ],
        };
    }

    static parse(str, binaryOperators = true, nested = false) {
        const group = new GroupParser([], str.trim(), { mode: 'AND' });
        group.parseFilters(binaryOperators, nested);
        return group;
    }

    constructor(filters, remainingStr, options) {
        super();
        this.filters = filters;
        this.remainingStr = remainingStr;
        this.options = options;
    }

    parseFilters(binaryOperators, nested) {
        let prevParser = null;
        while (this.remainingStr.length) {
            const options = { prevParser, binaryOperators, nested };
            const parser = this.parseNext(this.remainingStr, options);
            if (!parser) break;
            parser.apply(this.filters);
            if (this.remainingStr === parser.remainingStr) break;
            this.remainingStr = parser.remainingStr.trimLeft();
            prevParser = parser;
            if (parser.endGroup) break;
            binaryOperators = true;
        }
    }

    test(obj) {
        if (this.options.mode === 'AND')
            return this.filters.every(f => f.test(obj));
        if (this.options.mode === 'OR')
            return this.filters.some(f => f.test(obj));
        throw new Error('Unknown filter group mode ' + this.options.mode);
    }
}
