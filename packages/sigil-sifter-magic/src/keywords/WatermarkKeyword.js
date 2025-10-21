import { StringKeyword } from 'sigil-sifter/keywords';
import { IncludesOperator } from 'sigil-sifter/operators';

export default class WatermarkKeyword extends StringKeyword {
    static get supportedOperators() {
        return [IncludesOperator];
    }

    static match(str) {
        return str === 'watermark' || str === 'w';
    }

    test(card) {
        return card.watermarks.some(w => super.test(w));
    }
}
