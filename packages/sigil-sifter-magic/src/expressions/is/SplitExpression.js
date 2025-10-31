import { Expression } from 'sigil-sifter/expressions';

export default class SplitExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^split/i);
    }

    includes(card) {
        return card.isSplit;
    }
}
