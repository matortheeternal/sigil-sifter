import { Expression } from 'sigil-sifter/expressions';

export default class EtchedExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^etched/i);
    }

    includes(card) {
        return card.isEtched;
    }
}
