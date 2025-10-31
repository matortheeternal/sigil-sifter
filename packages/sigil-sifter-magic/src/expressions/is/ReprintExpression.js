import { Expression } from 'sigil-sifter/expressions';

export default class ReprintExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^reprint/i);
    }

    includes(card) {
        return card.isReprint;
    }
}
