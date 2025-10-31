import { Expression } from 'sigil-sifter/expressions';

export default class SpellExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^spell/i);
    }

    includes(card) {
        return card.isSpell;
    }
}
