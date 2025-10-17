import Keyword from '../Keyword.js';
import { addKeywordClass } from '../../keywordRegistry.js';
import IncludesOperator from '../../operators/IncludesOperator.js';

export default class Watermark extends Keyword {
    static get supportedOperators() {
        return [IncludesOperator];
    }

    static get supportedExpressions() {
        return STRING_EXPRESSIONS;
    }

    static match(str) {
        return str === 'watermark' || str === 'w';
    }

    test(obj) {
        return (obj.watermarks || [])
            .some(watermark => super.test(watermark));
    }
}

addKeywordClass(Watermark);
