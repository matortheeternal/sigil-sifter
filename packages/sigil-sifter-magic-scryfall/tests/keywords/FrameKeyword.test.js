import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('Frame keyword', () => {
    it('matches cards with specific frame editions', () => {
        const res1997 = sifter.filter(cards, 'frame:1997');
        expectCardNames(res1997, [
            'Arena', "Gaea's Cradle", 'Jolrael, Empress of Beasts'
        ]);
        expectNotCardNames(res1997, ['Transcendent Master', 'Doubling Season']);

        const res2003 = sifter.filter(cards, 'frame:2003');
        expectCardNames(res2003, [
            'Aura Shards', 'Molten Firebird', 'Grizzly Bears'
        ]);
        expectNotCardNames(res2003, ['Balance', 'Serra Angel']);

        const res2015 = sifter.filter(cards, 'frame:2015');
        expectCardNames(res2015, [
            'Doubling Season', 'Serra Angel',
            'Balance', 'Smothering Tithe'
        ]);
        expectNotCardNames(res2015, ['Arena', 'Molten Firebird']);

        const resFuture = sifter.filter(cards, 'frame:future');
        expectCardNames(resFuture, ['Fleshwrither']);
        expectNotCardNames(resFuture, ['Arena', 'Serra Angel']);
    });

    it('is case insensitive for frame editions', () => {
        const lower = sifter.filter(cards, 'frame:future');
        const upper = sifter.filter(cards, 'FRAME:FUTURE');
        expect(lower).toEqual(upper);
    });

    it('supports = and : the same', () => {
        const res1 = sifter.filter(cards, 'frame=2015');
        const res2 = sifter.filter(cards, 'frame:2015');
        expect(res1).toEqual(res2);
    });

    describe('frame effects', () => {
        it('matches legendary frame effect', () => {
            const res = sifter.filter(cards, 'frame:legendary');
            expectCardNames(res, [
                'Aurelia, the Warleader', 'Tatyova, Benthic Druid',
                'Titania, Voice of Gaea', 'Ragavan, Nimble Pilferer',
                'The One Ring', 'Annie Joins Up', 'Rograkh, Son of Rohgahh',
                'Korvold, Fae-Cursed King', 'Morophon, the Boundless',
                'Uro, Titan of Nature\'s Wrath', 'Jegantha, the Wellspring',
                'Timeless Lotus', 'Atraxa, Praetors\' Voice'
            ]);
            expectNotCardNames(res, ['Doubling Season', 'Arena']);
        });

        it('matches enchantment frame effect', () => {
            const res = sifter.filter(cards, 'frame:enchantment');
            expectCardNames(res, [
                'Doubling Season', 'Felidar Retreat', 'Call the Spirit Dragons',
                'Omniscience', 'Temur Ascendancy', 'Xenagos, God of Revels',
                'Ghostly Prison', 'Bident of Thassa', 'Phyrexian Arena',
                'The Kami War // O-Kagachi Made Manifest'
            ]);
            expectNotCardNames(res, ['Arena', 'Grizzly Bears']);
        });

        it('matches colorshifted frame effect', () => {
            const res = sifter.filter(cards, 'frame:colorshifted');
            expectCardNames(res, ['Molten Firebird']);
        });

        it('matches tombstone frame effect', () => {
            const res = sifter.filter(cards, 'frame:tombstone');
            expectCardNames(res, ['Krosan Reclamation']);
            expectNotCardNames(res, ['Molten Firebird']);
        });

        it('handles cards with multiple frame effects', () => {
            const res = sifter.filter(cards, 'frame:enchantment');
            expectCardNames(res, [
                'Xenagos, God of Revels', 'Bident of Thassa',
                'The Kami War // O-Kagachi Made Manifest'
            ]);
        });
    });

    it('returns an empty array for unknown frame terms', () => {
        const res = sifter.filter(cards, 'frame:notrealframe');
        expect(res.length).toEqual(0);
    });
});
