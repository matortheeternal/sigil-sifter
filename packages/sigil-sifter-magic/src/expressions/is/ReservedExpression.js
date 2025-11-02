import { Expression } from 'sigil-sifter/expressions';

export default class ReservedExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^reserved/i);
    }

    includes(card) {
        return card.isReserved;
    }
}
