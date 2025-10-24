import StringExpression from '../expressions/StringExpression.js';
import EndNestedGroupParser from './EndNestedGroupParser.js';
import KeywordFilterParser from './KeywordFilterParser.js';
import NestedGroupParser from './NestedGroupParser.js';
import NegateParser from './NegateParser.js';
import ExactParser from './ExactParser.js';
import OrParser from './OrParser.js';
import Parser from './Parser.js';

export default class GroupParser extends Parser {
    static getParsersToTry({ nested }) {
        return {
            '-': NegateParser,
            '!': ExactParser,
            '(': NestedGroupParser,
            'o': OrParser,
            ...(nested && { ')': EndNestedGroupParser }),
            default: [
                KeywordFilterParser,
                StringExpression
            ],
        };
    }

    static parse(sifter, str, options = {}) {
        const group = new GroupParser(sifter, [], str.trim(), { mode: 'AND' });
        group.parseFilters(options);
        return group;
    }

    constructor(sifter, filters, remainingStr, options) {
        super(sifter);
        this.filters = filters;
        this.remainingStr = remainingStr;
        this.options = options;
    }

    parseFilters(options) {
        while (this.remainingStr.length) {
            const parser = this.parseNext(this.remainingStr, options);
            if (!parser) break;
            parser.apply(this.filters);
            if (this.remainingStr === parser.remainingStr) break;
            this.remainingStr = parser.remainingStr.trimLeft();
            if (parser.endGroup) break;
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
