import { NumericExpression } from 'sigil-sifter/expressions';

export default class ArrayLengthExpression extends NumericExpression {
    equals(val) {
        return val.length === this.value;
    }

    greaterThan(val) {
        return val.length > this.value;
    }

    lessThan(val) {
        return val.length < this.value;
    }
}
