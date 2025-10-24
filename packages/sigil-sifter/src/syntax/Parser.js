import Node from '../core/Node.js';
import IncludesOperator from '../operators/IncludesOperator.js';
import StringExpression from '../expressions/StringExpression.js';

export default class Parser extends Node {
    static parse(sifter, match, str) {
        return new this(sifter, match, str);
    }

    getParsers(str, options) {
        if (options.parsers) return options.parsers;
        const parsers = this.constructor.getParsersToTry(options);
        const parserKey = str.toLowerCase()[0];
        return [
            ...(parsers.hasOwnProperty(parserKey) ? [parsers[parserKey]] : []),
            ...(parsers.default || []),
        ];
    }

    parseString(parser, match, str, DefaultOperator) {
        return this.sifter.parseString(
            this.sifter,
            new DefaultOperator(this.sifter),
            parser.parse(this.sifter, match, str)
        );
    }

    parseNext(str, options = {}) {
        const defaultOperator = options.DefaultOperator || IncludesOperator;
        for (const parser of this.getParsers(str, options)) {
            const match = parser.match(this.sifter, str, options);
            if (!match) continue;
            return (parser === StringExpression)
                ? this.parseString(parser, match, str, defaultOperator)
                : parser.parse(this.sifter, match, str);
        }
    }
}
