import { StringKeyword } from 'sigil-sifter/keywords';

export default class Name extends StringKeyword {
    static match(str) {
        return str === 'name';
    }

    test(obj) {
        return super.test(obj.name || '');
    }
}
