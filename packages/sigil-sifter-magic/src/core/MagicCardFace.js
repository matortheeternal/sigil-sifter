import { NotImplementedError } from 'sigil-sifter/core';

export default class MagicCardFace {
    constructor(face) {
        this.face = face;
    }

    get artists() {
        throw new NotImplementedError();
    }

    get typeLine() {
        throw new NotImplementedError();
    }

    get colors() {
        throw new NotImplementedError();
    }

    get colorIdentity() {
        throw new NotImplementedError();
    }

    get flavorText() {
        throw new NotImplementedError();
    }

    get rulesText() {
        throw new NotImplementedError();
    }

    get rarity() {
        throw new NotImplementedError();
    }

    get watermarks() {
        throw new NotImplementedError();
    }
}
