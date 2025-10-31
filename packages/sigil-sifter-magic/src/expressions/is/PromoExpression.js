import { Expression } from 'sigil-sifter/expressions';

export default class PromoExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^promo/i);
    }

    includes(card) {
        return card.isPromo;
    }
}
