import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import ScryfallCard from '../../src/ScryfallCard.js';
import cards from '../fixtures/cards.json' with { type: 'json' };
import { expectCardNames } from '../helpers.js';
import {SearchSyntaxError} from 'sigil-sifter/core';

describe('ManaValue keyword', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter, ScryfallCard);
    });

    it('works with manavalue, mv, and cmc keys', () => {
        const res1 = sifter.filter(cards, 'manavalue:3');
        const res2 = sifter.filter(cards, 'mv:3');
        const res3 = sifter.filter(cards, 'cmc:3');
        expect(res1).toEqual(res2);
        expect(res2).toEqual(res3);
        expectCardNames(res1, [
            'Mayhem Devil', 'Inspirit, Flagship Vessel', 'Oko, Thief of Crowns',
            'Seething Song', 'Void Rend', 'Aura Shards', 'Raffine, Scheming Seer',
            'Murder', 'Anguished Unmaking', 'Teferi, Time Raveler',
            'Midnight Clock', 'Caretaker\'s Talent', 'Temur Ascendancy',
            'Ghostly Prison', 'Uro, Titan of Nature\'s Wrath', 'Phyrexian Arena',
        ]);
    });

    it('supports greater than operator', () => {
        const res1 = sifter.filter(cards, 'mv>8');
        expectCardNames(res1, [
            'Zacama, Primal Calamity', 'The Great Henge', 'Blasphemous Act',
            'Omniscience', 'Blightsteel Colossus'
        ]);
    });

    it('supports less than operator', () => {
        const res1 = sifter.filter(cards, 'mv<2');
        expectCardNames(res1, [
            'Soul Warden', 'Pact of Negation', 'City of Brass', 'Nature\'s Claim',
            'Rancor', 'Arena', 'Black Lotus', 'Reanimate', 'Gaea\'s Cradle', 'Sol Ring',
            'Dryad Arbor', 'Deathrite Shaman', 'Ragavan, Nimble Pilferer',
            'Lightning Bolt', 'Dark Ritual', 'Esper Sentinel', 'Llanowar Elves',
            'Swords to Plowshares', 'Birds of Paradise'
        ]);
    });

    it('supports greater than or equal to operator', () => {
        const res1 = sifter.filter(cards, 'mv>=6 mv<8');
        expectCardNames(res1, [
            'Savage Ventmaw', 'Aurelia, the Warleader', 'Rampaging Baloths',
            'Shivan Dragon', 'Mirror Universe', 'Primeval Titan', 'Platinum Angel',
            'Morophon, the Boundless', 'Muldrotha, the Gravetide', 'Tiamat',
            'Ruinous Ultimatum'
        ]);
    });

    it('supports less than or equal to operator', () => {
        const res1 = sifter.filter(cards, 'cmc<=0');
        expectCardNames(res1, [
            'Pact of Negation', 'City of Brass', 'Dryad Arbor',
            'Gaea\'s Cradle', 'Arena', 'Black Lotus',
        ]);
    });

    it('supports not equal operator', () => {
        const res1 = sifter.filter(cards, 'cmc!=8 cmc>7');
        expectCardNames(res1, [
            'Zacama, Primal Calamity', 'The Great Henge', 'Blasphemous Act',
            'Omniscience', 'Blightsteel Colossus'
        ]);
    });

    it('supports equal operator', () => {
        const res1 = sifter.filter(cards, 'cmc=12 OR cmc=10');
        expectCardNames(res1, ['Omniscience', 'Blightsteel Colossus']);
    });

    it('supports even expression', () => {
        const res1 = sifter.filter(cards, 'mv:even');
        expectCardNames(res1, [
            'Arena',
            'Rakdos Charm',
            'Leyline of the Guildpact',
            'Shivan Dragon',
            'Griselbrand',
            'Omniscience',
            'Blightsteel Colossus'
        ]);
    });

    it('supports odd expression', () => {
        const res1 = sifter.filter(cards, 'mv:odd');
        expectCardNames(res1, [
            'Deathrite Shaman',
            'Mayhem Devil',
            'Serra Angel',
            'Ruinous Ultimatum',
            'Zacama, Primal Calamity',
        ]);
    });

    it('throws when non-colon operator used with even/odd', () => {
        const test = function(search) {
            expect(() => sifter.filter(cards, search))
                .toThrowError(SearchSyntaxError);
        };
        test('mv=odd');
        test('mv>even');
        test('mv<odd');
    });
});
