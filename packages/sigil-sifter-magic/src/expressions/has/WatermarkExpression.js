import { Expression } from 'sigil-sifter/expressions';

export default class WatermarkExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^watermark/i);
    }

    includes(card) {
        return card.hasWatermark;
    }
}
