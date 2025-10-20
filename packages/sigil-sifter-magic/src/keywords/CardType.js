import { StringKeyword } from 'sigil-sifter/keywords';

export default class CardType extends StringKeyword {
    static match(str) {
        return str === 'type' || str === 't';
    }

    test(obj) {
        return this.constructor.getCardFaces(obj).some(face => {
            return super.test(face.typeLine);
        });
    }
}
