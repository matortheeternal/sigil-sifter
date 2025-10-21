import { StringKeyword } from 'sigil-sifter/keywords';

export default class RulesTextKeyword extends StringKeyword {
    static match(str) {
        return str === 'o' || str === 'oracle';
    }

    test(card) {
        return card.rulesTexts.some(rulesText => super.test(rulesText));
    }
}
