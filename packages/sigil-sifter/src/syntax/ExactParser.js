import Parser from './Parser.js';
import EqualsOperator from '../operators/EqualsOperator.js';
import StringExpression from '../expressions/StringExpression.js';

export default class ExactParser extends Parser {
    static getParsersToTry() {
        return [StringExpression];
    }

    static match(str) {
        return str.match(/^\s*!/);
    }

    static parse(match, str) {
        return new ExactParser(match, str);
    }

    constructor(str, match) {
        super(str, match);
        this.filter = this.parseNext(this.remainingStr, EqualsOperator);
        this.remainingStr = this.filter.remainingStr;
    }

    test(obj) {
        return this.filter.test(obj);
    }
}
