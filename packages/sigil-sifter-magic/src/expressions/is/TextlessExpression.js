import { Expression } from 'sigil-sifter/expressions';

export default class TextlessExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^textless/i);
    }

    includes(card) {
        return card.isTextless;
    }
}
