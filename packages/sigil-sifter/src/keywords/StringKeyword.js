import Keyword from './Keyword.js';
import RegExpression from '../expressions/RegExpression.js';
import StringExpression from '../expressions/StringExpression.js';

export default class StringKeyword extends Keyword {
    static get supportedExpressions() {
        return [RegExpression, StringExpression];
    }
}
