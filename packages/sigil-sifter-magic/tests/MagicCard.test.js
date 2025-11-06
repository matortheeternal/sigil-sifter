import { MagicCard } from '@sigil-sifter/magic/core';
import { NotImplementedError } from 'sigil-sifter/core';

class DummyCard extends MagicCard {}

describe('MagicCard abstract API', () => {
    const card = new DummyCard({ name: 'Test Card' });

    const props = [
        'artists', 'banned', 'border', 'collectorNumber', 'colors',
        'colorIdentity', 'formats', 'flavorTexts', 'frame',
        'frameEffects', 'game', 'keywords', 'loyalty', 'manaValues',
        'produces', 'pts', 'rarity', 'rulesTexts', 'restricted',
        'set', 'setType', 'stamp', 'typeLines', 'watermarks',
        'hasIndicator', 'hasWatermark',
        'isBooster', 'isDFC', 'isEtched', 'isFlip', 'isFoil',
        'isFrenchVanilla', 'isFullArt', 'isGlossy', 'isHistoric',
        'isHybrid', 'isLeveler', 'isMDFC', 'isMeld', 'isModal',
        'isNonFoil', 'isParty', 'isPermanent', 'isPhyrexian',
        'isPromo', 'isReprint', 'isReserved', 'isSpell', 'isSplit',
        'isSpotlight', 'isTextless', 'isTransform',
        'isUniversesBeyond', 'isVanilla'
    ];

    for (const prop of props) {
        it(`throws NotImplementedError for ${prop}`, () => {
            expect(() => card[prop]).toThrowError(
                NotImplementedError,
                'Method not implemented.'
            );
        });
    }
});
