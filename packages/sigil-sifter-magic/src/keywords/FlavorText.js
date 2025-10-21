import { StringKeyword } from 'sigil-sifter/keywords';

export default class FlavorText extends StringKeyword {
    static match(str) {
        return str === 'flavor' || str === 'ft';
    }

    test(card) {
        return card.flavorTexts.some(flavorText => super.test(flavorText));
    }
}
