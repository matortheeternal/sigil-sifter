import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import extras from '../fixtures/extras.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('is: keyword', () => {
    it('handles is:dfc', () => {
        const res = sifter.filter(cards, 'is:dfc');
        expectCardNames(res, [
            'Fell the Profane // Fell Mire', 'Wear // Tear', 'Crime // Punishment',
            'The Kami War // O-Kagachi Made Manifest', 'Trial // Error'
        ]);
        expectNotCardNames(res, ['Solemn Simulacrum', 'Lightning Bolt']);
    });

    it('handles is:mdfc', () => {
        const res = sifter.filter(cards, 'is:mdfc');
        expectCardNames(res, [
            'Fell the Profane // Fell Mire',
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
        expectNotCardNames(res, ['Crime // Punishment']);
    });

    it('handles is:transform', () => {
        const res = sifter.filter(cards, 'is:transform');
        expectCardNames(res, ['The Kami War // O-Kagachi Made Manifest']);
        expectNotCardNames(res, ['Fell the Profane // Fell Mire']);
    });

    it('handles is:split', () => {
        const res = sifter.filter(cards, 'is:split');
        expectCardNames(res, [
            'Wear // Tear', 'Trial // Error',
            'Crime // Punishment'
        ]);
        expectNotCardNames(res, ['The Kami War // O-Kagachi Made Manifest']);
    });

    it('handles is:hybrid', () => {
        const res = sifter.filter(cards, 'is:hybrid');
        expectCardNames(res, [
            'Deathrite Shaman', 'Leyline of the Guildpact',
            'Jegantha, the Wellspring', 'Ajani, Sleeper Agent'
        ]);
        expectNotCardNames(res, ['Lightning Bolt']);
    });

    it('handles is:modal', () => {
        const res = sifter.filter(cards, 'is:modal');
        // TODO spree
        expectCardNames(res, ['Felidar Retreat', 'Rakdos Charm']);
        expectNotCardNames(res, ['Balance']);
    });

    it('handles is:historic', () => {
        const res = sifter.filter(cards, 'is:historic');
        // TODO: sagas
        expectCardNames(res, [
            'Aurelia, the Warleader', 'Black Lotus',
            'The Great Henge', 'Nicol Bolas, Planeswalker', 'Time Vault'
        ]);
        expectNotCardNames(res, ['Lightning Bolt']);
    });

    it('handles is:permanent', () => {
        const res = sifter.filter(cards, 'is:permanent');
        expectCardNames(res, [
            'Solemn Simulacrum', 'Arena', 'Tatyova, Benthic Druid',
            'Sol Ring', 'Omniscience'
        ]);
        expectNotCardNames(res, ['Balance', 'Counterspell']);
    });

    it('handles is:spell', () => {
        const res = sifter.filter(cards, 'is:spell');
        expectCardNames(res, [
            'Lightning Bolt', 'Counterspell', 'Reanimate', 'Sol Ring',
            'Liliana, Dreadhorde General', 'Llanowar Elves',
            'Leyline of the Guildpact', 'Shivan Dragon'
        ]);
        expectNotCardNames(res, ['Arena', 'City of Brass']);
    });

    it('handles is:party', () => {
        const res = sifter.filter(cards, 'is:party');
        expectCardNames(res, [
            'Snapcaster Mage', 'Soul Warden',
            'Rograkh, Son of Rohgahh', 'Mirri, Cat Warrior'
        ]);
        expectNotCardNames(res, ['Lightning Bolt', 'Esper Sentinel']);
    });

    it('matches french vanilla cards (is:frenchvanilla)', () => {
        const res = sifter.filter(cards, 'is:frenchvanilla');
        expectCardNames(res, [
            'Sheltering Ancient', 'Fleshwrither', 'Serra Angel',
            'Rograkh, Son of Rohgahh', 'Sire of Seven Deaths',
            'Apex Devastator', 'Phyrexian Fleshgorger',
            'Mirri, Cat Warrior', 'Akroma, Angel of Wrath'
        ]);
        expectNotCardNames(res, [
            'Black Lotus', 'Dark Ritual',
            'Tatyova, Benthic Druid', 'Rampaging Baloths'
        ]);
    });

    it('handles is:phyrexian', () => {
        const res = sifter.filter(cards, 'is:phyrexian');
        expectCardNames(res, [
            'Gitaxian Probe',
            'Ajani, Sleeper Agent',
            'Etali, Primal Conqueror // Etali, Primal Sickness'
        ]);
        expectNotCardNames(res, ['Lightning Bolt', 'Time Vault']);
    });

    it('handles is:flip', () => {
        const res = sifter.filter(cards, 'is:flip');
        expectCardNames(res, ['Budoka Gardener // Dokai, Weaver of Life']);
        expectNotCardNames(res, [
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
    });

    it('handles is:meld', () => {
        const res = sifter.filter(cards, 'is:meld');
        expectCardNames(res, ['Titania, Voice of Gaea']);
        expectNotCardNames(res, ['Lightning Bolt']);
    });

    it('handles is:leveler', () => {
        const res = sifter.filter(cards, 'is:leveler');
        expectCardNames(res, ['Transcendent Master']);
        expectNotCardNames(res, ['Felidar Retreat']);
    });

    it('handles is:vanilla', () => {
        const res = sifter.filter(cards, 'is:vanilla');
        expectCardNames(res, ['Grizzly Bears']);
        expectNotCardNames(res, ['Aurelia, the Warleader']);
    });

    it('handles is:booster', () => {
        const res = sifter.filter(cards, 'is:booster');
        expectCardNames(res, ['Doubling Season', 'Balance', 'Smothering Tithe']);
        expectNotCardNames(res, ['Solemn Simulacrum', 'Akroma, Angel of Wrath']);
    });

    it('handles is:foil', () => {
        const res = sifter.filter(cards, 'is:foil');
        expectCardNames(res, ['Doubling Season', 'Arena', 'Snapcaster Mage']);
        expectNotCardNames(res, ['Zacama, Primal Calamity', 'Wonder']);
    });

    it('handles is:nonfoil', () => {
        const res = sifter.filter(cards, 'is:nonfoil');
        expectCardNames(res, ['Solemn Simulacrum', 'Felidar Retreat']);
    });

    it('handles is:etched', () => {
        const res = sifter.filter(cards, 'is:etched');
        expectCardNames(res, ['Braids, Cabal Minion', 'Goblin Bombardment']);
    });

    it('handles is:glossy', () => {
        const res = sifter.filter(extras, 'is:glossy');
        expectCardNames(res, ['God-Eternal Kefnet', 'Battlefield Forge']);
    });

    it('handles is:fullart and alias is:full', () => {
        const res1 = sifter.filter(cards, 'is:fullart');
        const res2 = sifter.filter(cards, 'is:full');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Inspirit, Flagship Vessel']);
        expectNotCardNames(res1, ['Doubling Season', 'Arena']);
    });

    it('handles is:promo', () => {
        const res = sifter.filter(cards, 'is:promo');
        expectCardNames(res, ['Baldur\'s Gate Wilderness']);
    });

    it('handles is:reprint', () => {
        const res = sifter.filter(cards, 'is:reprint');
        expectCardNames(res, ['Solemn Simulacrum', 'Doubling Season', 'Omniscience']);
        expectNotCardNames(res, ['Ruinous Ultimatum', 'Uro, Titan of Nature\'s Wrath']);
    });

    it('handles is:spotlight', () => {
        const res = sifter.filter(cards, 'is:spotlight');
        expectCardNames(res, ['Call the Spirit Dragons']);
        expectNotCardNames(res, ['Tatyova, Benthic Druid', 'Balance']);
    });

    it('handles is:textless', () => {
        const res = sifter.filter(extras, 'is:textless');
        expectCardNames(res, ['Tidings']);
    });

    it('handles is:ub', () => {
        const res1 = sifter.filter(cards, 'is:ub');
        const res2 = sifter.filter(cards, 'is:universesbeyond');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['The One Ring']);
    });

    it('handles is:reserved', () => {
        const res = sifter.filter(cards, 'is:reserved');
        expectCardNames(res, [
            'Black Lotus', 'Gaea\'s Cradle',
            'Mirror Universe', 'Time Vault'
        ]);
    });
});
