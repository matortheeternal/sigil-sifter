import { StringKeyword } from 'sigil-sifter/keywords';
import { IncludesOperator } from 'sigil-sifter/operators';

export default class Watermark extends StringKeyword {
    static get supportedOperators() {
        return [IncludesOperator];
    }

    static match(str) {
        return str === 'watermark' || str === 'w';
    }

    test(obj) {
        return this.constructor.getCardFaces(obj).some(face => {
            return face.watermarks.some(w => super.test(w));
        });
    }
}
