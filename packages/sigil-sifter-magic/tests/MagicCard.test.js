import { MagicCard } from '@sigil-sifter/magic/core';
import { NotImplementedError } from 'sigil-sifter/core';

class DummyCard extends MagicCard {}

describe('MagicCard abstract API', () => {
    const card = new DummyCard({ name: 'Test Card' });

    const props = [
        'artists', 'typeLines', 'colors', 'colorIdentity',
        'flavorTexts', 'keywords', 'loyalty', 'manaValues',
        'produces', 'pts', 'rulesTexts', 'rarity', 'set',
        'setType', 'watermarks',
        'hasIndicator', 'hasWatermark',
        'isDFC', 'isFlip', 'isFrenchVanilla', 'isHistoric',
        'isHybrid', 'isLeveler', 'isMDFC', 'isMeld', 'isModal',
        'isParty', 'isPermanent', 'isPhyrexian', 'isSpell',
        'isSplit', 'isTransform', 'isVanilla'
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
