import { Expression } from 'sigil-sifter/expressions';

export default class PermanentExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^permanent/i);
    }

    includes(card) {
        return card.isPermanent;
    }
}
