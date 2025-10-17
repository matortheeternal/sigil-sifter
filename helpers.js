import IncludesOperator from './operators/IncludesOperator.js';
import EqualsOperator from './operators/EqualsOperator.js';
import GreaterThanOperator from './operators/GreaterThanOperator.js';
import GTEOperator from './operators/GTEOperator.js';
import LessThanOperator from './operators/LessThanOperator.js';
import LTEOperator from './operators/LTEOperator.js';
import NotEqualOperator from './operators/NotEqualOperator.js';
import RegExpression from './expressions/RegExpression.js';
import StringExpression from './expressions/StringExpression.js';

export const ALL_OPERATORS = [
    IncludesOperator,
    EqualsOperator,
    GreaterThanOperator,
    GTEOperator,
    LessThanOperator,
    LTEOperator,
    NotEqualOperator
];

export const STRING_EXPRESSIONS = [
    RegExpression,
    StringExpression
];
