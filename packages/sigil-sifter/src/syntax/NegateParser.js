import NestedGroupParser from './NestedGroupParser.js';
import KeywordFilterParser from './KeywordFilterParser.js';
import { SearchSyntaxError } from '../core/customErrors.js';
import StringExpression from '../expressions/StringExpression.js';
import ExactParser from './ExactParser.js';
import Parser from './Parser.js';

export default class NegateParser extends Parser {
    static getParsersToTry() {
        return {
            '(': NestedGroupParser,
            '!': ExactParser,
            default: [KeywordFilterParser, StringExpression]
        };
    }

    static match(sifter, str) {
        return str.match(/^\s*-/);
    }

    static parse(sifter, match, str) {
        return new NegateParser(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.filter = this.parseNext(this.remainingStr);
        if (!this.filter)
            throw new SearchSyntaxError('Expected "-" to be followed by a filter.', str);
        this.remainingStr = this.filter.remainingStr;
    }

    test(obj) {
        return !this.filter.test(obj);
    }
}
