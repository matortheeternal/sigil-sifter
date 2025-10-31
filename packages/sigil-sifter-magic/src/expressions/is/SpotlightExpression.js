import { Expression } from 'sigil-sifter/expressions';

export default class SpotlightExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^spotlight/i);
    }

    includes(card) {
        return card.isSpotlight;
    }
}
