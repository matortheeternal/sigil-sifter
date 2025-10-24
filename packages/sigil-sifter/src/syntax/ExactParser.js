import Parser from './Parser.js';
import EqualsOperator from '../operators/EqualsOperator.js';
import StringExpression from '../expressions/StringExpression.js';

export default class ExactParser extends Parser {
    static getParsersToTry() {
        return { default: [StringExpression] };
    }

    static match(sifter, str) {
        return str.match(/^\s*!/);
    }

    static parse(sifter, match, str) {
        return new ExactParser(sifter, match, str);
    }

    constructor(sifter, str, match) {
        super(sifter, str, match);
        const options = { DefaultOperator: EqualsOperator };
        this.filter = this.parseNext(this.remainingStr, options);
        this.remainingStr = this.filter.remainingStr;
    }

    test(obj) {
        return this.filter.test(obj);
    }
}
