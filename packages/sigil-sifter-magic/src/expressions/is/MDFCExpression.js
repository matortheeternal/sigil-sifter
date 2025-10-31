import { Expression } from 'sigil-sifter/expressions';

export default class MDFCExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^mdfc/i);
    }

    includes(card) {
        return card.isMDFC;
    }
}
