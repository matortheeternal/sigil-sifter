import { MagicCard } from '@sigil-sifter/magic/core';

const hasKeywords = f => f.keywords && f.keywords.length;

function hasAbilityWord(sifter, keywords) {
    return keywords.some(kw => sifter.KeywordExtension.isAbilityWord(kw));
}

export default class CardMagicianCard extends MagicCard {
    get faces() {
        return [this.card.front, this.card.back].filter(Boolean);
    }

    get artists() {
        return this.faces.reduce((artists, face) => {
            artists.push(face.illustrator);
            return artists;
        }, []);
    }

    get template() {
        return this.faces.map(face => face.template);
    }

    get border() {
        return this.card.front.borderColor;
    }

    get collectorNumber() {
        return parseInt(
            this.card.front.collectorNumber ||
            this.card.front.autoCollectorNumber ||
            '0'
        );
    }

    get colors() {
        const colors = this.faces.flatMap(f => {
            return f.colors.map(c => c.char.toUpperCase()) || [];
        });
        return [...new Set(colors)];
    }

    get colorIdentity() {
        return this.colors;
    }

    get flavorTexts() {
        return this.faces.map(face => (face.flavorText || ''));
    }

    get frame() {
        return this.card.frame;
    }

    get frameEffects() {
        return [];
    }

    get keywords() {
        return this.faces.flatMap(face =>
            (face.keywords || []).map(kw => kw.toLowerCase())
        );
    }

    get language() {
        return this.card.front.language;
    }

    get loyalty() {
        return parseInt(this.card.front.loyalty);
    }

    get names() {
        return this.faces.map(face => (face.name || ''));
    }

    get manaValues() {
        return this.faces.map(face => (face.manaCost?.cmc || 0));
    }

    get manaCosts() {
        return this.faces.map(face => face.manaCost?.toString() || '');
    }

    get produces() {
        return this.faces.flatMap(face => face.producedMana || []);
    }

    get pts() {
        return this.faces
            .filter(face => face.hasOwnProperty('power'))
            .map(face => ({
                power: parseInt(face.power) || 0,
                toughness: parseInt(face.toughness) || 0
            }));
    }

    get rarity() {
        return this.card.front.rarity || '';
    }

    get rulesTexts() {
        return this.faces.map(face => (face.rulesText || ''));
    }

    get stamp() {
        return this.card.front.stamp || '';
    }

    get typeLines() {
        return this.faces.map(face => [
            face.superType,
            face.subType
        ].filter(Boolean).join(' — '));
    }

    get watermarks() {
        return this.faces.reduce((watermarks, face) => {
            if (face.watermark) watermarks.push(face.watermark)
            return watermarks;
        }, []);
    }

    get hasIndicator() {
        return false; // TODO
    }

    get isDFC() {
        return this.faces.length > 1;
    }

    get isEtched() {
        return this.card.front.finish === 'etched';
    }

    get isFlip() {
        return this.card.front.layout === 'flip'; // TODO
    }

    get isFoil() {
        return this.card.front.finish !== 'normal';
    }

    get isFrenchVanilla() {
        return this.faces.some(f => {
            if (f.rulesText === '' || !/creature/i.test(f.superType))
                return false;
            if (!hasKeywords(f) || hasAbilityWord(this.sifter, f.keywords))
                return false;
            const kwExpr = new RegExp(`^(${f.keywords.join('|')})`, 'i');
            const lines = f.rulesText.split('\n');
            return lines.every(line => kwExpr.test(line));
        });
    }

    get isFullArt() {
        return this.card.front.artSize?.includes('borderless');
    }

    get isGlossy() {
        return this.card.front.finish === 'glossy';
    }

    get isHybrid() {
        return this.manaCosts.some(cost => cost.includes('/'));
    }

    get isMDFC() {
        return this.card.front.layout === 'modal_dfc'; // TODO
    }

    get isMeld() {
        return this.card.front.layout === 'meld'; // TODO
    }

    get isModal() {
        return this.rulesTexts.some(rt => {
            return rt.includes('\n•')
                || rt.includes('{P}');
        }) || this.keywords.includes('spree');
    }

    get isNonFoil() {
        return this.card.front.finish === 'normal';
    }

    get isPhyrexian() {
        return this.manaCosts.some(cost => {
            return cost.includes('H');
        }) || this.rulesTexts.some(rt => {
            return /{[\/WUBRG]+H}/g.test(rt);
        });
    }

    get isSplit() {
        return this.card.front.layout === 'split'; // TODO
    }

    get isTextless() {
        return false; // TODO
    }

    get isTransform() {
        return this.card.front.layout === 'transform';  // TODO
    }

    get isUniversesBeyond() {
        return this.card.front.stamp === 'ub';
    }
}
