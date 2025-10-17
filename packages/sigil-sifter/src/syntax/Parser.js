import Node from '../core/Node.js';
import IncludesOperator from '../operators/IncludesOperator.js';
import StringExpression from '../expressions/StringExpression.js';
import { NoDefaultParserError, SearchSyntaxError } from '../core/customErrors.js';

export default class Parser extends Node {
    static ParseDefault(DefaultOperator, expression) {
        throw new NoDefaultParserError(expression);
    }

    parseNext(str, DefaultOperator = IncludesOperator) {
        for (const parser of super.getParsersToTry(options)) {
            const match = parser.match(str, options.prevParser);
            if (match && parser === StringExpression) {
                const expression = parser.parse(match, str);
                return Parser.ParseDefault(DefaultOperator, expression);
            }
            if (match) return parser.parse(match, str);
        }
        throw new SearchSyntaxError('Could not find parser to parse', str);
    }
}
