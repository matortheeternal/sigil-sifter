import defaultAbilityWords from '../data/abilityWords.js';

export default class KeywordExtension {
    constructor(data) {
        this.abilityWords = data.abilityWords || defaultAbilityWords;
    }

    isAbilityWord(str) {
        return this.abilityWords.includes(str);
    }
}
