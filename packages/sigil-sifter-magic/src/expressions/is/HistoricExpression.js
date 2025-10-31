import { Expression } from 'sigil-sifter/expressions';

export default class HistoricExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^historic/i);
    }

    includes(card) {
        return card.isHistoric;
    }
}
