import { NotImplementedError } from 'sigil-sifter/core';

export default class MagicCard {
    constructor(card) {
        this.card = card;
        this._cache = {};
    }

    cache(key, initFn) {
        if (!this._cache.hasOwnProperty(key))
            this._cache[key] = initFn();
        return this._cache[key];
    }

    get artists() {
        throw new NotImplementedError();
    }

    get typeLines() {
        throw new NotImplementedError();
    }

    get colors() {
        throw new NotImplementedError();
    }

    get colorIdentity() {
        throw new NotImplementedError();
    }

    get flavorTexts() {
        throw new NotImplementedError();
    }

    get keywords() {
        throw new NotImplementedError();
    }

    get loyalty() {
        throw new NotImplementedError();
    }

    get manaValues() {
        throw new NotImplementedError();
    }

    get pts() {
        throw new NotImplementedError();
    }

    get rulesTexts() {
        throw new NotImplementedError();
    }

    get rarity() {
        throw new NotImplementedError();
    }

    get watermarks() {
        throw new NotImplementedError();
    }
}
