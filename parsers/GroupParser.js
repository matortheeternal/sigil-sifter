import EndNestingParser from './EndNestingParser.js';
import OrOperatorParser from './OrOperatorParser.js';
import NegateOperatorParser from './NegateOperatorParser.js';
import KeywordFilterParser from './KeywordFilterParser.js';
import NestedGroupParser from './NestedGroupParser.js';
import StringExpression from '../expressions/StringExpression.js';
import ExactOperatorParser from './ExactOperatorParser.js';
import IncludesOperator from '../operators/IncludesOperator.js';
import Parser from './Parser.js';
import Name from '../keywords/magic/Name.js';

const BINARY_OPERATOR_PARSERS = [
    OrOperatorParser,
];

const FILTER_PARSERS = [
    NegateOperatorParser,
    ExactOperatorParser,
    NestedGroupParser,
    KeywordFilterParser,
    StringExpression
];

function getParsersToTry({ binaryOperators, nested }) {
    const parsersToTry = FILTER_PARSERS.slice();
    if (binaryOperators) parsersToTry.unshift(...BINARY_OPERATOR_PARSERS);
    if (nested) parsersToTry.unshift(EndNestingParser);
    return parsersToTry;
}

function parseNext(str, prevParser, options) {
    for (const parser of getParsersToTry(options)) {
        const match = parser.match(str, prevParser);
        if (match && parser === StringExpression) {
            const expression = parser.parse(match, str);
            return new Name(new IncludesOperator(), expression);
        }
        if (match) return parser.parse(match, str);
    }
    throw new SearchSyntaxError('Could not find parser to parse', str);
}

export default class GroupParser extends Parser {
    static parse(str, binaryOperators = true, nested = false) {
        let remainingStr = str.trim();
        let prevParser = null;
        const filters = [];
        while (remainingStr.length) {
            const parser = parseNext(
                remainingStr, prevParser,
                { binaryOperators, nested }
            );
            if (!parser) break;
            parser.apply(filters);
            remainingStr = parser.remainingStr;
            prevParser = parser;
            if (parser.endGroup) break;
            binaryOperators = true;
        }
        return new GroupParser(filters, remainingStr, { mode: 'AND' });
    }

    constructor(filters, remainingStr, options) {
        super();
        this.filters = filters;
        this.remainingStr = remainingStr;
        this.options = options;
    }

    test(obj) {
        if (this.options.mode === 'AND')
            return this.filters.every(f => f.test(obj));
        if (this.options.mode === 'OR')
            return this.filters.some(f => f.test(obj));
        throw new Error('Unknown filter group mode ' + this.options.mode);
    }
}
