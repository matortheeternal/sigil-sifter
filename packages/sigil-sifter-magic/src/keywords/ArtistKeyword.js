import { StringKeyword } from 'sigil-sifter/keywords';

export default class ArtistKeyword extends StringKeyword {
    static match(str) {
        return str === 'artist' || str === 'a';
    }

    test(card) {
        return card.artists.some(a => super.test(a));
    }
}
