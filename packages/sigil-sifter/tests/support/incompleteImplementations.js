import Expression from '../../src/expressions/Expression.js';
import { Keyword } from '../../src/keywords/index.js';

export class UnimplmentedExpression extends Expression {}
export class MatchableExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^\w+/);
    }
}

export class UnimplementedKeyword extends Keyword {
    static get supportedExpressions() {
        return [UnimplmentedExpression];
    }

    static get keys() {
        return ['u'];
    }
}

export class MatchableKeyword extends Keyword {
    static get supportedExpressions() {
        return [MatchableExpression];
    }

    static get keys() {
        return ['m'];
    }
}

export class PartialExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^\w+/);
    }

    static parse(sifter, match, str) {
        return new PartialExpression(sifter, match, str);
    }
}

export class PartialKeyword extends Keyword {
    static get supportedExpressions() {
        return [PartialExpression];
    }

    static get keys() {
        return ['p'];
    }
}
