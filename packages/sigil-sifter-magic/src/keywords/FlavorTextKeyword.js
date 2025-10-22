import { StringKeyword } from 'sigil-sifter/keywords';

export default class FlavorTextKeyword extends StringKeyword {
    static get keys() {
        return ['flavor', 'ft'];
    }

    test(card) {
        return card.flavorTexts.some(flavorText => super.test(flavorText));
    }
}
