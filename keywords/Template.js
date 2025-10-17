import StringKeyword from './StringKeyword.js';
import { addKeywordClass } from '../keywordRegistry.js';

export default class Template extends StringKeyword {
    static match(str) {
        return str === 'template';
    }

    test(obj) {
        return super.test(obj.template);
    }
}

addKeywordClass(Template);
