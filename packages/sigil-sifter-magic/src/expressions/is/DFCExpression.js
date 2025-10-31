import { Expression } from 'sigil-sifter/expressions';

export default class DFCExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^dfc/i);
    }

    includes(card) {
        return card.isDFC;
    }
}
