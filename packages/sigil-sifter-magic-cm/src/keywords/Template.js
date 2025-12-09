import { StringKeyword } from 'sigil-sifter/keywords';

export default class Template extends StringKeyword {
    static get keys() {
        return ['template'];
    }

    test(obj) {
        return super.test(obj.template);
    }
}
