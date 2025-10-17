import { StringKeyword } from 'sigil-sifter/keywords';

export default class RulesText extends StringKeyword {
    static match(str) {
        return str === 'o' || str === 'oracle';
    }

    test(obj) {
        return super.test(obj.rulesText);
    }
}
