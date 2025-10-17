import StringKeyword from '../StringKeyword.js';
import { addKeywordClass } from '../../keywordRegistry.js';

export default class Name extends StringKeyword {
    static match(str) {
        return str === 'name';
    }

    test(obj) {
        return super.test(obj.name || '');
    }
}

addKeywordClass(Name);
