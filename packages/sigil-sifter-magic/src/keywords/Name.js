import { StringKeyword } from 'sigil-sifter/keywords';

export default class Name extends StringKeyword {
    static match(str) {
        return str === 'name';
    }

    test(obj) {
        return this.constructor.getCardFaces(obj).some(face => {
            return super.test(face.name);
        });
    }
}
