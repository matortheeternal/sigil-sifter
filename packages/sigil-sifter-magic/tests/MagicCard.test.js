import { MagicCard } from '@sigil-sifter/magic/core';
import { NotImplementedError } from 'sigil-sifter/core';

class DummyCard extends MagicCard {}

describe('MagicCard abstract API', () => {
    const card = new DummyCard({ name: 'Test Card' });

    const props = [
        'artists', 'typeLines', 'colors', 'colorIdentity',
        'frame', 'frameEffects', 'flavorTexts', 'game',
        'keywords', 'loyalty', 'manaValues', 'produces', 'pts',
        'rulesTexts', 'rarity', 'set', 'setType', 'watermarks',
        'hasIndicator', 'hasWatermark',
        'isBooster', 'isDFC', 'isEtched', 'isFlip', 'isFoil',
        'isFrenchVanilla', 'isFullArt', 'isGlossy', 'isHistoric',
        'isHybrid', 'isLeveler', 'isMDFC', 'isMeld', 'isModal',
        'isNonFoil', 'isParty', 'isPermanent', 'isPhyrexian',
        'isPromo', 'isReprint', 'isReserved', 'isSpell', 'isSplit',
        'isSpotlight', 'isTextless', 'isTransform', 'isVanilla'
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
