import { StringKeyword } from 'sigil-sifter/keywords';

export default class CardType extends StringKeyword {
    static match(str) {
        return str === 'type' || str === 't';
    }

    test(obj) {
        return super.test(obj.superType || '')
            || super.test(obj.subType || '');
    }
}
