import { NotImplementedError } from 'sigil-sifter/core';

const permanentTypes = [
    'land', 'creature', 'artifact', 'enchantment',
    'planeswalker', 'battle', 'summon', 'eaturecray'
];

const spellTypes = [
    'instant', 'sorcery', 'creature', 'artifact', 'enchantment',
    'planeswalker', 'battle', 'summon', 'eaturecray'
];

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

    get isPermanent() {
        return this.typeParts.some(part => permanentTypes.includes(part));
    }

    get isSpell() {
        return this.typeParts.some(part => spellTypes.includes(part));
    }

    get artists() {
        throw new NotImplementedError();
    }

    get typeLines() {
        throw new NotImplementedError();
    }

    get typeParts() {
        return this.typeLines.flatMap(typeLine => {
            return typeLine.toLowerCase().split(/\s+/);
        });
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
