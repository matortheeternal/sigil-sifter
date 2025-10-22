import { StringKeyword } from 'sigil-sifter/keywords';

export default class CardTypeKeyword extends StringKeyword {
    static get keys() {
        return ['type', 't'];
    }

    test(card) {
        return card.typeLines.some(t => super.test(t));
    }
}
