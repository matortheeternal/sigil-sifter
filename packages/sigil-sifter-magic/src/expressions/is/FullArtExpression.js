import { Expression } from 'sigil-sifter/expressions';

export default class FullArtExpression extends Expression {
    static match(sifter, str) {
        return str.match(/^full(art)?/i);
    }

    includes(card) {
        return card.isFullArt;
    }
}
