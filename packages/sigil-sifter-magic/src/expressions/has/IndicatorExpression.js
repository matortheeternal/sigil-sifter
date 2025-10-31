import { Expression } from 'sigil-sifter/expressions';

export default class IndicatorExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^indicator/i);
    }

    includes(card) {
        return card.hasIndicator;
    }
}
