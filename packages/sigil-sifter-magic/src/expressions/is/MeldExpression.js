import { Expression } from 'sigil-sifter/expressions';

export default class MeldExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^meld/i);
    }

    includes(card) {
        return card.isMeld;
    }
}
