import PowTouExpression from '../expressions/PowTouExpression.js';

export function comparingPtAgainst(expression, mode) {
    return expression.constructor === PowTouExpression
        && expression.mode === mode;
}
