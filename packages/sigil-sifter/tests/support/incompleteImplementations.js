import Expression from '../../src/expressions/Expression.js';
import { Keyword } from '../../src/keywords/index.js';
import Operator from '../../src/operators/Operator.js';
import StringKeyword from '../../src/keywords/StringKeyword.js';

export class UnimplementedKeyword extends Keyword {}

export class UnimplmentedExpression extends Expression {}
export class MatchableExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^\w+/);
    }
}

export class UnimplementedExKeyword extends Keyword {
    static get supportedExpressions() {
        return [UnimplmentedExpression];
    }

    static get keys() {
        return ['u'];
    }
}

export class MatchableExKeyword extends Keyword {
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

export class PartialExKeyword extends Keyword {
    static get supportedExpressions() {
        return [PartialExpression];
    }

    static get keys() {
        return ['p'];
    }
}

export class UnimplementedOperator extends Operator {}

export class UnimplementedOpKeyword extends StringKeyword {
    static get supportedOperators() {
        return [UnimplementedOperator];
    }

    static get keys() {
        return ['op'];
    }
}

export class MatchableOperator extends UnimplementedOperator {
    static match(sifter, str) {
        return str.match(/^\^/);
    }
}

export class MatchableOpKeyword extends UnimplementedOpKeyword {
    static get supportedOperators() {
        return [MatchableOperator];
    }
}

export class PartialOperator extends MatchableOperator {
    static parse(sifter, match, str) {
        return new PartialOperator(sifter, match, str);
    }
}

export class PartialOpKeyword extends UnimplementedOpKeyword {
    static get supportedOperators() {
        return [PartialOperator];
    }
}
