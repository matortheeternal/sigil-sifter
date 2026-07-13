import { StringKeyword } from 'sigil-sifter/keywords';

export default class TagKeyword extends StringKeyword {
    static get keys() {
        return ['otag', 'tag', 'oracletag', 'function'];
    }

    test(card) {
        return card.tags.some(tag => super.test(tag));
    }
}
