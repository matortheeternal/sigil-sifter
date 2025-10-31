import { Expression } from 'sigil-sifter/expressions';

export default class FoilExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^foil/i);
    }

    includes(card) {
        return card.isFoil;
    }
}
