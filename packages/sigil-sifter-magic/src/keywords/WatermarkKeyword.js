import { StringKeyword } from 'sigil-sifter/keywords';
import { IncludesOperator } from 'sigil-sifter/operators';

export default class WatermarkKeyword extends StringKeyword {
    static get keys() {
        return ['watermark', 'w'];
    }

    static get supportedOperators() {
        return [IncludesOperator];
    }

    test(card) {
        return card.watermarks.some(w => super.test(w));
    }
}
