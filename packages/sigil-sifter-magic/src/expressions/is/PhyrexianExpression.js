import { Expression } from 'sigil-sifter/expressions';

export default class PhyrexianExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^phyrexian/i);
    }

    includes(card) {
        return card.isPhyrexian;
    }
}
