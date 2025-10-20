import { MagicCardFace } from '@sigil-sifter/magic/core';

export default class ScryfallCardFace extends MagicCardFace {
    static getCardFaces(obj) {
        return (obj.card_faces || [obj]).map(face => {
            return new ScryfallCardFace(face);
        });
    }

    get artists() {
        return [
            this.face.illustrator || '',
            this.face.illustrator2 || ''
        ];
    }

    get typeLine() {
        return this.face.type_line || '';
    }

    get colors() {
        return this.face.colors || [];
    }

    get colorIdentity() {
        return this.face.color_identity || [];
    }

    get flavorText() {
        return this.face.flavor_text || '';
    }

    get rulesText() {
        return this.face.oracle_text || '';
    }

    get rarity() {
        return this.face.rarity || '';
    }

    get watermarks() {
        return this.face.watermarks || [];
    }
}
