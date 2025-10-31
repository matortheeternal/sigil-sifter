import { Expression } from 'sigil-sifter/expressions';

export default class NonFoilExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^nonfoil/i);
    }

    includes(card) {
        return card.isNonFoil;
    }
}
