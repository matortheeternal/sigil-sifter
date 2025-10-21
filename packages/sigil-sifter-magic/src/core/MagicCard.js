import { NotImplementedError } from 'sigil-sifter/core';

export default class MagicCard {
    constructor(card) {
        this.card = card;
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
