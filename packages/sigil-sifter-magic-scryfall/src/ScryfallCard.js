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
        const colors = this.faces.reduce((colors, f) => {
            return Array.prototype.concat(colors, f.colors || []);
        }, []);
        colors.push(...(this.card.colors || []));
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

    get names() {
        return this.faces.map(face => (face.name || ''));
    }

    get manaValues() {
        return this.faces.map(face => (face.cmc || 0));
    }

    get manaCosts() {
        return this.faces.map(face => new ManaCost(face.mana_cost || ''));
    }

    get pts() {
        return this.faces
            .filter(face => face.hasOwnProperty('power'))
            .map(face => ({
                power: parseInt(face.power),
                toughness: parseInt(face.toughness)
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
            watermarks.push(...face.watermarks)
            return watermarks;
        }, []);
    }
}
