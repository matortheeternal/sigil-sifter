import { StringKeyword } from 'sigil-sifter/keywords';

export default class Artist extends StringKeyword {
    static match(str) {
        return str === 'artist' || str === 'a';
    }

    test(obj) {
        return super.test(obj.illustrator) || super.test(obj.illustrator2);
    }
}
