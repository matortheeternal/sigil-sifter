import NestedGroupParser from './NestedGroupParser.js';
import KeywordFilterParser from './KeywordFilterParser.js';
import ExactOperatorParser from './ExactOperatorParser.js';
import StringExpression from '../expressions/StringExpression.js';
import Parser from './Parser.js';

export default class NegateOperatorParser extends Parser {
    static getParsersToTry() {
        return [
            NestedGroupParser, KeywordFilterParser,
            ExactOperatorParser, StringExpression
        ];
    }

    static match(str) {
        return str.match(/^\s*-/);
    }

    static parse(match, str) {
        return new NegateOperatorParser(match, str);
    }

    constructor(match, str) {
        super();
        this.remainingStr = str.slice(match[0].length);
    }

    apply(filters) {
        this.filter = this.parseNext(this.remainingStr);
        filters.push(this);
    }

    test(obj) {
        return !this.filter.test(obj);
    }
}
