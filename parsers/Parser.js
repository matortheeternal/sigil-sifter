import StringExpression from '../expressions/StringExpression.js';
import Name from '../keywords/magic/Name.js';
import IncludesOperator from '../operators/IncludesOperator.js';

export default class Parser {
    constructor(match, str) {
        if (!match) return;
        this.remainingStr = str.slice(match[0].length);
    }

    parseNext(str, DefaultOperator = IncludesOperator) {
        for (const parser of super.getParsersToTry(options)) {
            const match = parser.match(str, options.prevParser);
            if (match && parser === StringExpression) {
                const expression = parser.parse(match, str);
                return new Name(new DefaultOperator(), expression);
            }
            if (match) return parser.parse(match, str);
        }
        throw new SearchSyntaxError('Could not find parser to parse', str);
    }
}
