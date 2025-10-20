import { StringKeyword } from 'sigil-sifter/keywords';

export default class RulesText extends StringKeyword {
    static match(str) {
        return str === 'o' || str === 'oracle';
    }

    test(obj) {
        return this.constructor.getCardFaces(obj).some(face => {
            return super.test(face.rulesText);
        });
    }
}
