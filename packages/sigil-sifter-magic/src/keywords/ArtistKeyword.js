import { StringKeyword } from 'sigil-sifter/keywords';

export default class ArtistKeyword extends StringKeyword {
    static get keys() {
        return ['artist', 'a'];
    }

    test(card) {
        return card.artists.some(a => super.test(a));
    }
}
