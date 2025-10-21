import { sifter } from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/fixtures.json';
import ScryfallCard from '../../src';

beforeAll(() => {
    Magic(sifter, ScryfallCard);
});

function expectCardNames(cards, expectedNames) {
    const actualNames = cards.map(c => c.name);
    for (const name of expectedNames)
        expect(actualNames).toContain(name);
}

function printArray(items) {
    console.log('[' + items.map(c => `'${c.name}'`).join(', ') + ']');
}

describe('Color keyword', () => {
    it('shorthand c: and full color: behave the same', () => {
        const white1 = sifter.filter(cards, 'c=w');
        const white2 = sifter.filter(cards, 'color=w');
        expect(white1).toEqual(white2);
        expectCardNames(white1, [
            'Smothering Tithe', 'Felidar Retreat', 'Balance',
            'Stoneforge Mystic', 'Serra Angel', 'Esper Sentinel',
            'Shalai, Voice of Plenty', 'All That Glitters',
            'Swords to Plowshares', `Caretaker's Talent`,
            'Ghostly Prison', 'Soul Warden'
        ]);
    });

    it('filters by individual color names (case-insensitive)', () => {
        const blue = sifter.filter(cards, 'c=blue');
        const blueCaps = sifter.filter(cards, 'C=BLUE');
        expect(blue).toEqual(blueCaps);
        expectCardNames(blue,  [
            'Wonder', 'Snapcaster Mage', 'Omniscience', 'Force of Will',
            'Midnight Clock', 'Counterspell', 'Bident of Thassa',
            'Pact of Negation'
        ]);
    });

    it('filters by guild (Golgari)', () => {
        const golgari = sifter.filter(cards, 'c=golgari');
        expectCardNames(golgari, [
            'Abrupt Decay', 'Deathrite Shaman', 'The Gitrog Monster'
        ]);
    });

    it('filters by wedge (Jund)', () => {
        const jund = sifter.filter(cards, 'c=jund');
        expectCardNames(jund, ['Korvold, Fae-Cursed King']);
    });

    it('filters by shard (Esper)', () => {
        const esper = sifter.filter(cards, 'c=esper');
        expectCardNames(esper, [
            'Void Rend', 'Raffine, Scheming Seer', 'Trial // Error'
        ]);
    });

    it('filters by 4-color (Growth)', () => {
        const growth = sifter.filter(cards, 'c=growth');
        expectCardNames(growth, [`Atraxa, Praetors' Voice`]);
    });

    it('filters by all colors (WUBRG)', () => {
        const fiveColor = sifter.filter(cards, 'c=wubrg');
        expectCardNames(fiveColor,
            ['Call the Spirit Dragons', 'Leyline of the Guildpact', 'Tiamat']
        );
    });

    it('filters by colorless', () => {
        const colorless = sifter.filter(cards, 'c=c');
        expectCardNames(colorless, [
            'Solemn Simulacrum', 'Talisman of Creativity', 'The One Ring',
            'Black Lotus', 'Sol Ring', 'Gaea\'s Cradle', 'Mirror Universe',
            'Time Vault', 'Platinum Angel', 'Morophon, the Boundless',
            'Blightsteel Colossus', 'City of Brass', 'Timeless Lotus'
        ]);
    });

    it('OR operator works (R or B)', () => {
        const rb = sifter.filter(cards, 'c=r or c=b');
        expectCardNames(rb, [
            'Diabolic Tutor', 'Ragavan, Nimble Pilferer', 'Lightning Bolt',
            'Dark Ritual', 'Seething Song', 'Shivan Dragon', 'Blasphemous Act',
            'Murder', 'Reanimate', 'Damnation', 'Sneak Attack',
            'Goblin Bombardment', 'Phyrexian Arena', 'Griselbrand',
            'Terror of the Peaks'
        ]);
    });

    it('multiple OR operators', () => {
        const wgb = sifter.filter(cards, 'c=w or c=g or c=b');
        expectCardNames(wgb, [
            'Doubling Season', 'Diabolic Tutor', 'Smothering Tithe',
            'Felidar Retreat', 'Balance', 'Rampaging Baloths',
            'Stoneforge Mystic', 'Tarmogoyf', 'Tarmogoyf', 'Serra Angel',
            'Dark Ritual', 'Esper Sentinel', 'Llanowar Elves',
            'Nature\'s Claim', 'The Great Henge', 'Murder', 'Rancor',
            'Reanimate', 'Shalai, Voice of Plenty', 'Kenrith\'s Transformation',
            'All That Glitters', 'Primeval Titan', 'Swords to Plowshares',
            'Caretaker\'s Talent', 'Birds of Paradise', 'Damnation',
            'Ghostly Prison', 'Llanowar Elves', 'Phyrexian Arena',
            'Soul Warden', 'Griselbrand']);
    });

    it('AND combination (G and U)', () => {
        const gu = sifter.filter(cards, 'c:g c:u');
        expectCardNames(gu, [
            'Tatyova, Benthic Druid', 'Call the Spirit Dragons',
            'Oko, Thief of Crowns', 'Leyline of the Guildpact',
            'Tamiyo, Field Researcher', 'Muldrotha, the Gravetide',
            'Temur Ascendancy', 'Tiamat'
        ]);
    });

    it('negation works (-c:r -c:g -c:w -c:b excludes red, green, white, and black)', () => {
        const notRed = sifter.filter(cards, '-c=r -c:g -c:w -c:b');
        expectCardNames(notRed,  [
            'Solemn Simulacrum', 'Talisman of Creativity', 'Wonder',
            'Snapcaster Mage', 'The One Ring', 'Black Lotus', 'Sol Ring',
            'Omniscience', 'Gaea\'s Cradle', 'Mirror Universe', 'Force of Will',
            'Time Vault', 'Platinum Angel', 'Morophon, the Boundless',
            'Midnight Clock', 'Counterspell', 'Bident of Thassa',
            'Blightsteel Colossus', 'City of Brass', 'Pact of Negation',
            'Timeless Lotus'
        ]);
    });

    it('colon operator (:) means >= (supercolor sets)', () => {
        const atLeastAzorius = sifter.filter(cards, 'c:azorius');
        expectCardNames(atLeastAzorius, [
            'Call the Spirit Dragons', 'The Kami War // O-Kagachi Made Manifest',
            'Inspirit, Flagship Vessel', 'Leyline of the Guildpact', 'Void Rend',
            'Atraxa, Praetors\' Voice', 'Raffine, Scheming Seer',
            'Tamiyo, Field Researcher', 'Trial // Error', 'Tiamat'
        ]);
    });

    it('comparison operators (<, <=, >, >=)', () => {
        const lessThanAzorius = sifter.filter(cards, 'c<azorius');
        expectCardNames(lessThanAzorius, [
            'Solemn Simulacrum', 'Talisman of Creativity', 'Smothering Tithe',
            'Felidar Retreat', 'Balance', 'Wonder', 'Snapcaster Mage',
            'Stoneforge Mystic', 'The One Ring', 'Serra Angel', 'Black Lotus',
            'Esper Sentinel', 'Sol Ring', 'Omniscience', 'Gaea\'s Cradle',
            'Mirror Universe', 'Force of Will', 'Time Vault',
            'Shalai, Voice of Plenty', 'All That Glitters', 'Platinum Angel',
            'Swords to Plowshares', 'Morophon, the Boundless', 'Midnight Clock',
            'Caretaker\'s Talent', 'Counterspell', 'Bident of Thassa',
            'Blightsteel Colossus', 'Ghostly Prison', 'City of Brass',
            'Pact of Negation', 'Soul Warden', 'Timeless Lotus'
        ]);

        const greaterThanAzorius = sifter.filter(cards, 'c>azorius');
        expectCardNames(greaterThanAzorius, [
            'Call the Spirit Dragons', 'Inspirit, Flagship Vessel',
            'Leyline of the Guildpact', 'Void Rend',
            'Tamiyo, Field Researcher', 'Tiamat'
        ]);
    });

    it('empty results return cleanly', () => {
        const results = sifter.filter(cards, 'c=r c=u c=g');
        expect(results).toEqual([]);
        printArray(results);
    });

    it('throws error if both colorless and colored given', () => {
        expect(() => sifter.filter(cards, 'c=cw'))
            .toThrow(/cannot be both colorless and colored/i);
    });
});
