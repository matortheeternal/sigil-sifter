import { StringExpression } from 'sigil-sifter/expressions';

export default class SimpleStringExpression extends StringExpression {
    includes(value) {
        return this.equals(value);
    }

    equals(value) {
        return value.toLowerCase() === this.value;
    }
}
