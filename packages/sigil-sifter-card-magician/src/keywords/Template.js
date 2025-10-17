import { StringKeyword } from 'sigil-sifter/keywords';

export default class Template extends StringKeyword {
    static match(str) {
        return str === 'template';
    }

    test(obj) {
        return super.test(obj.template);
    }
}
