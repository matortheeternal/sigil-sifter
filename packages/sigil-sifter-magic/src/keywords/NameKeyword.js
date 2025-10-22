import { StringKeyword } from 'sigil-sifter/keywords';

export default class NameKeyword extends StringKeyword {
    static get keys() {
        return ['name'];
    }

    test(card) {
        return card.names.some(name => super.test(name));
    }
}
