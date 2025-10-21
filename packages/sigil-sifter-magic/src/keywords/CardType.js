import { StringKeyword } from 'sigil-sifter/keywords';

export default class CardType extends StringKeyword {
    static match(str) {
        return str === 'type' || str === 't';
    }

    test(card) {
        return card.typeLines.some(t => super.test(t));
    }
}
