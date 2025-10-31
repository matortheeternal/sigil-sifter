import { Expression } from 'sigil-sifter/expressions';

export default class LevelerExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^leveler/i);
    }

    includes(card) {
        return card.isLeveler;
    }
}
