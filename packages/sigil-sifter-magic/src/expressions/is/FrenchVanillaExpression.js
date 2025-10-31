import { Expression } from 'sigil-sifter/expressions';

export default class FrenchVanillaExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^frenchvanilla/i);
    }

    includes(card) {
        return card.isFrenchVanilla;
    }
}
