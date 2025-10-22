import { StringKeyword } from 'sigil-sifter/keywords';

export default class RulesTextKeyword extends StringKeyword {
    static get keys() {
        return ['oracle', 'o'];
    }

    test(card) {
        return card.rulesTexts.some(rulesText => super.test(rulesText));
    }
}
