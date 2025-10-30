import { MagicCard } from '@sigil-sifter/magic/core';

export default class ScryfallCard extends MagicCard {
    get faces() {
        return this.card.card_faces
            ? this.card.card_faces
            : [this.card];
    }

    get artists() {
        return this.faces.reduce((artists, face) => {
            artists.push(face.artist)
            if (face.artist2) artists.push(face.artist2);
            return artists;
        }, []);
    }

    get typeLines() {
        return this.faces.map(face => (face.type_line || ''));
    }

    get colors() {
        const colors = [
            ...(this.card.colors || []),
            ...this.faces.flatMap(f => f.colors || [])
        ];
        return [...new Set(colors)];
    }

    get colorIdentity() {
        return this.card.color_identity;
    }

    get flavorTexts() {
        return this.faces.map(face => (face.flavor_text || ''));
    }

    get keywords() {
        const keywords = [];
        for (const face of this.faces)
            for (const kw of (face.keywords || []))
                keywords.push(kw.toLowerCase());
        return keywords;
    }

    get loyalty() {
        const value = this.faces[0].loyalty;
        return value === undefined ? NaN : parseInt(value);
    }

    get names() {
        return [
            ...(this.card.hasOwnProperty('name') ? [this.card.name] : []),
            ...this.faces.map(face => (face.name || ''))
        ];
    }

    get manaValues() {
        return this.card.hasOwnProperty('cmc')
            ? [this.card.cmc]
            : this.faces.map(face => (face.cmc || 0));
    }

    get manaCosts() {
        return this.faces.map(face => face.mana_cost || '');
    }

    get pts() {
        return this.faces
            .filter(face => face.hasOwnProperty('power'))
            .map(face => ({
                power: parseInt(face.power) || 0,
                toughness: parseInt(face.toughness) || 0
            }));
    }

    get rulesTexts() {
        return this.faces.map(face => (face.oracle_text || ''));
    }

    get rarity() {
        return this.card.rarity || '';
    }

    get watermarks() {
        return this.faces.reduce((watermarks, face) => {
            if (face.watermark) watermarks.push(face.watermark)
            return watermarks;
        }, []);
    }
}
