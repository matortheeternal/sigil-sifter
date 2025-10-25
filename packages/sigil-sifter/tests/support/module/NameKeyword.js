import { StringKeyword } from 'sigil-sifter/keywords';

export default class NameKeyword extends StringKeyword {
    static get keys() {
        return ['name'];
    }

    test(item) {
        return super.test(item.name);
    }
}
