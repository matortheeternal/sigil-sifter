import { NotImplementedError } from 'sigil-sifter/core';

const permanentTypes = [
    'land', 'creature', 'artifact', 'enchantment',
    'planeswalker', 'battle', 'summon', 'eaturecray'
];

const spellTypes = [
    'instant', 'sorcery', 'creature', 'artifact', 'enchantment',
    'planeswalker', 'battle', 'summon', 'eaturecray'
];

const historicTypes = ['artifact', 'saga', 'legendary'];
const partyTypes = ['wizard', 'rogue', 'warrior', 'cleric', 'rogue'];

export default class MagicCard {
    constructor(sifter, card) {
        this.sifter = sifter;
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

    get border() {
        throw new NotImplementedError();
    }

    get collectorNumber() {
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

    get formats() {
        throw new NotImplementedError();
    }

    get frame() {
        throw new NotImplementedError();
    }

    get frameEffects() {
        throw new NotImplementedError();
    }

    get game() {
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

    get produces() {
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

    get set() {
        throw new NotImplementedError();
    }

    get setType() {
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

    get watermarks() {
        throw new NotImplementedError();
    }

    get hasIndicator() {
        throw new NotImplementedError();
    }

    get hasWatermark() {
        return this.watermarks.length > 0;
    }

    get isBooster() {
        throw new NotImplementedError();
    }

    get isDFC() {
        throw new NotImplementedError();
    }

    get isEtched() {
        throw new NotImplementedError();
    }

    get isFlip() {
        throw new NotImplementedError();
    }

    get isFoil() {
        throw new NotImplementedError();
    }

    get isFrenchVanilla() {
        throw new NotImplementedError();
    }

    get isFullArt() {
        throw new NotImplementedError();
    }

    get isGlossy() {
        throw new NotImplementedError();
    }

    get isHistoric() {
        return this.typeParts.some(part => historicTypes.includes(part));
    }

    get isHybrid() {
        throw new NotImplementedError();
    }

    get isLeveler() {
        return this.keywords.includes('level up');
    }

    get isMDFC() {
        throw new NotImplementedError();
    }

    get isMeld() {
        throw new NotImplementedError();
    }

    get isModal() {
        throw new NotImplementedError();
    }

    get isNonFoil() {
        throw new NotImplementedError();
    }

    get isParty() {
        return this.typeParts.some(part => partyTypes.includes(part));
    }

    get isPermanent() {
        return this.typeParts.some(part => permanentTypes.includes(part));
    }

    get isPhyrexian() {
        throw new NotImplementedError();
    }

    get isPromo() {
        throw new NotImplementedError();
    }

    get isReprint() {
        throw new NotImplementedError();
    }

    get isReserved() {
        throw new NotImplementedError();
    }

    get isSpell() {
        return this.typeParts.some(part => spellTypes.includes(part));
    }

    get isSplit() {
        throw new NotImplementedError();
    }

    get isSpotlight() {
        throw new NotImplementedError();
    }

    get isTextless() {
        throw new NotImplementedError();
    }

    get isTransform() {
        throw new NotImplementedError();
    }

    get isUniversesBeyond() {
        throw new NotImplementedError();
    }

    get isVanilla() {
        return this.rulesTexts.some(rt => rt === '');
    }
}
