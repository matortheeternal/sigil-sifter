import { StringKeyword } from 'sigil-sifter/keywords';

export default class Artist extends StringKeyword {
    static match(str) {
        return str === 'artist' || str === 'a';
    }

    test(obj) {
        return this.constructor.getCardFaces(obj).some(face => {
            return face.artists.some(a => super.test(a));
        });
    }
}
