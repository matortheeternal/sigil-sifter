import { Expression } from 'sigil-sifter/expressions';

export default class ModalExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^modal/i);
    }

    includes(card) {
        return card.isModal;
    }
}
