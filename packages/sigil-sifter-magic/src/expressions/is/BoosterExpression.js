import { Expression } from 'sigil-sifter/expressions';

export default class BoosterExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^booster/i);
    }

    includes(card) {
        return card.isBooster;
    }
}
