import { Expression } from 'sigil-sifter/expressions';

export default class HybridExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^hybrid/i);
    }

    includes(card) {
        return card.isHybrid;
    }
}
