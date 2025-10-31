import { Expression } from 'sigil-sifter/expressions';

export default class UniversesBeyondExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^(ub|universesbeyond)/i);
    }

    includes(card) {
        return card.isUniversesBeyond;
    }
}
