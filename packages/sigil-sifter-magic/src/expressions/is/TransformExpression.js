import { Expression } from 'sigil-sifter/expressions';

export default class TransformExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^transform/i);
    }

    includes(card) {
        return card.isTransform;
    }
}
