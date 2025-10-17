import StringExpression from '../expressions/StringExpression.js';
import Parser from './Parser.js';
import EqualsOperator from '../operators/EqualsOperator.js';

export default class ExactOperatorParser extends Parser {
    static getParsersToTry() {
        return [StringExpression];
    }

    static match(str) {
        return str.match(/^\s*!/);
    }

    static parse(match, str) {
        return new ExactOperatorParser(match, str);
    }

    apply(filters) {
        this.filter = this.parseNext(this.remainingStr, EqualsOperator);
        this.remainingStr = expr.remainingStr;
        filters.push(this);
    }

    test(obj) {
        return this.filter.test(obj);
    }
}
