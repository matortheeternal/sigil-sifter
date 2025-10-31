import { Expression } from 'sigil-sifter/expressions';

export default class PartyExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^party/i);
    }

    includes(card) {
        return card.isParty;
    }
}
