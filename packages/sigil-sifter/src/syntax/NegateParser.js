import NestedGroupParser from './NestedGroupParser.js';
import KeywordFilterParser from './KeywordFilterParser.js';
import ExactParser from './ExactParser.js';
import StringExpression from '../expressions/StringExpression.js';
import Parser from './Parser.js';

export default class NegateParser extends Parser {
    static getParsersToTry() {
        return [
            NestedGroupParser, KeywordFilterParser,
            ExactParser, StringExpression
        ];
    }

    static match(str) {
        return str.match(/^\s*-/);
    }

    static parse(match, str) {
        return new NegateParser(match, str);
    }

    constructor(match, str) {
        super();
        this.remainingStr = str.slice(match[0].length);
        this.filter = this.parseNext(this.remainingStr);
    }

    test(obj) {
        return !this.filter.test(obj);
    }
}
