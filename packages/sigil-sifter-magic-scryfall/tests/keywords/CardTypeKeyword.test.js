import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

const sifter = new Sifter();
Magic(sifter, ScryfallCard);

describe('Type keyword', () => {
    it('handles shorthand t: and full type: the same', () => {
        const res1 = sifter.filter(cards, 't:creature');
        const res2 = sifter.filter(cards, 'type:creature');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Solemn Simulacrum',
            'Deathrite Shaman',
            'Wonder',
            'Snapcaster Mage',
            'Serra Angel'
        ]);
    });

    it('matches quoted type name', () => {
        const res = sifter.filter(cards, 'type:"Legendary Creature"');
        expectCardNames(res, [
            'Tatyova, Benthic Druid',
            'Aurelia, the Warleader',
            'Ragavan, Nimble Pilferer',
            'Atraxa, Praetors\' Voice',
            'Korvold, Fae-Cursed King'
        ]);
    });

    it('matches unquoted type name', () => {
        const res = sifter.filter(cards, 'type:artifact');
        expectCardNames(res, [
            'Solemn Simulacrum',
            'Talisman of Creativity',
            'Sol Ring',
            'The One Ring',
            'Mirror Universe'
        ]);
    });

    it('matches regex type name, case insensitive', () => {
        const res1 = sifter.filter(cards, 'type:/dragon/');
        const res2 = sifter.filter(cards, 'type:/DRAGON/');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Shivan Dragon',
            'Savage Ventmaw',
            'Terror of the Peaks',
            'The Kami War // O-Kagachi Made Manifest'
        ]);
    });

    it('supports negation (-type:)', () => {
        const res = sifter.filter(cards, '-type:instant');
        expectNotCardNames(res, [
            'Lightning Bolt',
            'Counterspell',
            'Force of Will',
            'Swords to Plowshares'
        ]);
    });

    it('handles double-faced / multi-type cards correctly', () => {
        const res = sifter.filter(cards, 'type:land');
        expectCardNames(res, [
            'Fell the Profane // Fell Mire',
            'City of Brass',
            'Gaea\'s Cradle'
        ]);
    });

    it('supports OR operator across types', () => {
        const res = sifter.filter(cards, 't:artifact OR t:enchantment');
        expectCardNames(res, [
            'Solemn Simulacrum',
            'Talisman of Creativity',
            'Sol Ring',
            'Smothering Tithe',
            'Doubling Season'
        ]);
    });

    it('supports AND for multiple types on the same card', () => {
        const res = sifter.filter(cards, 't:artifact t:creature');
        expectCardNames(res, [
            'Solemn Simulacrum',
            'Esper Sentinel',
            'Blightsteel Colossus',
            'Platinum Angel'
        ]);
    });

    it('works in combination with other filters', () => {
        const res = sifter.filter(cards, 't:enchantment c:G');
        expectCardNames(res, [
            'Doubling Season',
            'Aura Shards',
            'Rancor'
        ]);
    });

    it('handles bogus type gracefully', () => {
        const res = sifter.filter(cards, 'type:"NotARealType"');
        expectCardNames(res, []);
    });
});
