import Color from './Color.js';

export default class ColorIdentity extends Color {
    static match(str) {
        return str === 'identity' || str === 'id';
    }

    test(obj) {
        return this.constructor.getCardFaces(obj).some(face => {
            const colors = face.colorIdentity.map(c => c.toLowerCase());
            return this.operator.testValue(colors, this.expression);
        });
    }
}
