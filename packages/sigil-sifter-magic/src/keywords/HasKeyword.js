import { Keyword } from 'sigil-sifter/keywords';
import IndicatorExpression from '../expressions/has/IndicatorExpression.js';
import WatermarkExpression from '../expressions/has/WatermarkExpression.js';

export default class HasKeyword extends Keyword {
    static get supportedExpressions() {
        return [IndicatorExpression, WatermarkExpression];
    }

    static get keys() {
        return ['has'];
    }
}
