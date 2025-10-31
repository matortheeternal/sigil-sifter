import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/fixtures.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

const sifter = new Sifter();
Magic(sifter, ScryfallCard);

describe('Color Identity keyword', () => {
    it('handles shorthand id: and full identity: the same', () => {
        const white1 = sifter.filter(cards, 'id:W');
        const white2 = sifter.filter(cards, 'identity:W');
        expect(white1).toEqual(white2);
        expectCardNames(white1, [
            'Smothering Tithe',
            'Felidar Retreat',
            'Balance',
            'Serra Angel',
            'Esper Sentinel',
            'All That Glitters',
            'Swords to Plowshares',
            'Caretaker\'s Talent',
            'Ghostly Prison',
            'Soul Warden'
        ]);
    });

    it('filters by individual colors (case-insensitive)', () => {
        const blue = sifter.filter(cards, 'id:blue');
        const blueCaps = sifter.filter(cards, 'ID:BLUE');
        expect(blue).toEqual(blueCaps);
        expectCardNames(blue, [
            'Wonder',
            'Snapcaster Mage',
            'Omniscience',
            'Force of Will',
            'Midnight Clock',
            'Counterspell',
            'Bident of Thassa',
            'Pact of Negation'
        ]);
    });

    it('filters by guild (Golgari)', () => {
        const golgari = sifter.filter(cards, 'id:golgari');
        const gb = sifter.filter(cards, 'id:GB');
        expect(golgari).toEqual(gb);
        expectCardNames(golgari, [
            'Abrupt Decay',
            'Deathrite Shaman',
            'The Gitrog Monster'
        ]);
    });

    it('filters by wedge (Jund)', () => {
        const jund = sifter.filter(cards, 'id:jund');
        const gbr = sifter.filter(cards, 'id:GBR');
        expect(jund).toEqual(gbr);
        expectCardNames(jund, [
            'Korvold, Fae-Cursed King'
        ]);
    });

    it('matches five-color identity', () => {
        const fiveColor = sifter.filter(cards, 'id:WUBRG');
        expectCardNames(fiveColor, [
            'Call the Spirit Dragons',
            'The Kami War // O-Kagachi Made Manifest',
            'Leyline of the Guildpact',
            'Morophon, the Boundless',
            'Tiamat',
            'Jegantha, the Wellspring',
            'Timeless Lotus'
        ]);
    });

    it('handles colorless cards (no identity)', () => {
        const colorless = sifter.filter(cards, 'id:C');
        expectCardNames(colorless, [
            'Solemn Simulacrum',
            'The One Ring',
            'Black Lotus',
            'Sol Ring',
            'Mirror Universe',
            'Time Vault',
            'Platinum Angel',
            'Blightsteel Colossus',
            'City of Brass'
        ]);
    });

    it('includes edge case Dryad Arbor', () => {
        const green = sifter.filter(cards, 'id:G');
        expectCardNames(green, [
            'Dryad Arbor'
        ]);
    });

    it('supports negation (-id:)', () => {
        const nonRed = sifter.filter(cards, '-id:R');
        expectNotCardNames(nonRed, [
            'Ragavan, Nimble Pilferer',
            'Lightning Bolt',
            'Shivan Dragon',
            'Sneak Attack'
        ]);
    });
});
