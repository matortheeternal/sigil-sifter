import { MagicCard } from '@sigil-sifter/magic/core';

const hasKeywords = f => f.keywords && f.keywords.length;

function hasAbilityWord(sifter, keywords) {
    return keywords.some(kw => sifter.KeywordExtension.isAbilityWord(kw));
}

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

    get collectorNumber() {
        return parseInt(this.card.collector_number || '0');
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

    get language() {
        return this.card.lang;
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

    get produces() {
        return this.faces.flatMap(face => face.produced_mana || []);
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

    get set() {
        return {
            code: this.card.set,
            name: this.card.set_name
        };
    }

    get setType() {
        return this.card.set_type;
    }

    get typeLines() {
        return this.faces.map(face => (face.type_line || ''));
    }

    get watermarks() {
        return this.faces.reduce((watermarks, face) => {
            if (face.watermark) watermarks.push(face.watermark)
            return watermarks;
        }, []);
    }

    get hasIndicator() {
        return this.card.hasOwnProperty('color_indicator');
    }

    get isBooster() {
        return this.card.booster;
    }

    get isDFC() {
        return this.faces.length > 1;
    }

    get isEtched() {
        return this.card.finishes.includes('etched');
    }

    get isFlip() {
        return this.card.layout === 'flip';
    }

    get isFoil() {
        return this.card.foil;
    }

    get isFrenchVanilla() {
        return this.faces.some(f => {
            if (f.oracle_text === '' || !/creature/i.test(f.type_line))
                return false;
            if (!hasKeywords(f) || hasAbilityWord(this.sifter, f.keywords))
                return false;
            const kwExpr = new RegExp(`^(${f.keywords.join('|')})`, 'i');
            const lines = f.oracle_text.split('\n');
            return lines.every(line => kwExpr.test(line));
        });
    }

    get isFullArt() {
        return this.card.full_art;
    }

    get isGlossy() {
        const pt = this.card.promo_types;
        return this.card.set === 'ps19'
            || (pt && pt.includes('glossy'));
    }

    get isHybrid() {
        return this.manaCosts.some(cost => {
            return cost.includes('/');
        });
    }

    get isMDFC() {
        return this.card.layout === 'modal_dfc';
    }

    get isMeld() {
        return this.card.layout === 'meld';
    }

    get isModal() {
        return this.rulesTexts.some(rt => {
            return rt.includes('\n•')
                || rt.includes('{P}');
        }) || this.keywords.includes('spree');
    }

    get isNonFoil() {
        return this.card.nonfoil;
    }

    get isPhyrexian() {
        return this.manaCosts.some(cost => {
            return cost.includes('P');
        }) || this.rulesTexts.some(rt => {
            return /{[\/WUBRG]+P}/g.test(rt);
        });
    }

    get isPromo() {
        return this.card.promo;
    }

    get isReprint() {
        return this.card.reprint;
    }

    get isSplit() {
        return this.card.layout === 'split';
    }

    get isSpotlight() {
        return this.card.story_spotlight;
    }

    get isTextless() {
        return this.card.textless;
    }

    get isTransform() {
        return this.card.layout === 'transform';
    }

    get isUniversesBeyond() {
        const pt = this.card.promo_types;
        return pt && pt.includes('universesbeyond');
    }
}
