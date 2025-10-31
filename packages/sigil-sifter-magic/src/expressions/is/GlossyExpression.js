import { Expression } from 'sigil-sifter/expressions';

export default class GlossyExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^glossy/i);
    }

    includes(card) {
        return card.isGlossy;
    }
}
