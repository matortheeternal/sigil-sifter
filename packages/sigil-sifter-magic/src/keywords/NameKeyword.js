import { StringKeyword } from 'sigil-sifter/keywords';

export default class NameKeyword extends StringKeyword {
    static match(str) {
        return str === 'name';
    }

    test(card) {
        return card.names.some(name => super.test(name));
    }
}
