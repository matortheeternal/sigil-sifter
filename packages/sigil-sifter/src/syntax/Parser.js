import Node from '../core/Node.js';
import IncludesOperator from '../operators/IncludesOperator.js';
import StringExpression from '../expressions/StringExpression.js';
import { NoDefaultParserError } from '../core/customErrors.js';

export default class Parser extends Node {
    static ParseDefault(DefaultOperator, expression) {
        throw new NoDefaultParserError(expression);
    }

    parseNext(str, options = {}, DefaultOperator = IncludesOperator) {
        for (const parser of this.constructor.getParsersToTry(options)) {
            const match = parser.match(str, options.prevParser);
            if (match && parser === StringExpression) {
                const expression = parser.parse(match, str);
                return Parser.ParseDefault(DefaultOperator, expression);
            }
            if (match) return parser.parse(match, str);
        }
    }
}
