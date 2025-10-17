import Color from './Color.js';

export default class ColorIdentity extends Color {
    static match(str) {
        return str === 'identity' || str === 'id';
    }

    test(obj) {
        return this.operator.testValue(obj.colorIdentity || [], this.expression);
    }
}
