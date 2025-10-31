import { Expression } from 'sigil-sifter/expressions';

export default class FlipExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^flip/i);
    }

    includes(card) {
        return card.isFlip;
    }
}
