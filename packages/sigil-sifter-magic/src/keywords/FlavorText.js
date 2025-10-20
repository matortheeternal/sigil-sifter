import { StringKeyword } from 'sigil-sifter/keywords';

export default class FlavorText extends StringKeyword {
    static match(str) {
        return str === 'flavor' || str === 'ft';
    }

    test(obj) {
        return this.constructor.getCardFaces(obj).some(face => {
            return super.test(face.flavorText);
        });
    }
}
