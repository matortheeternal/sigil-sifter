import { Expression } from 'sigil-sifter/expressions';

export default class VanillaExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^vanilla/i);
    }

    includes(card) {
        return card.isVanilla;
    }
}
