import { StringKeyword } from 'sigil-sifter/keywords';

export default class Template extends StringKeyword {
    static get keys() {
        return ['template'];
    }

    test(obj) {
        return obj.template.some(t => super.test(t));
    }
}
