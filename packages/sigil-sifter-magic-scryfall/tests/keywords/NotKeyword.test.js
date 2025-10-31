import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectNotCardNames, expectCardNames } from '../helpers.js';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('not: keyword', () => {
    it('matches double-faced cards (not:dfc)', () => {
        const res = sifter.filter(cards, 'not:dfc');
        expectNotCardNames(res, [
            'Fell the Profane // Fell Mire', 'Wear // Tear', 'Crime // Punishment',
            'The Kami War // O-Kagachi Made Manifest', 'Trial // Error'
        ]);
        expectCardNames(res, ['Solemn Simulacrum', 'Lightning Bolt']);
    });

    it('matches modal double-faced cards (not:mdfc)', () => {
        const res = sifter.filter(cards, 'not:mdfc');
        expectNotCardNames(res, [
            'Fell the Profane // Fell Mire',
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
        expectCardNames(res, ['Crime // Punishment']);
    });

    it('matches transform cards (not:transform)', () => {
        const res = sifter.filter(cards, 'not:transform');
        expectNotCardNames(res, ['The Kami War // O-Kagachi Made Manifest']);
        expectCardNames(res, ['Fell the Profane // Fell Mire']);
    });

    it('matches split cards (not:split)', () => {
        const res = sifter.filter(cards, 'not:split');
        expectNotCardNames(res, [
            'Wear // Tear', 'Trial // Error',
            'Crime // Punishment'
        ]);
        expectCardNames(res, ['The Kami War // O-Kagachi Made Manifest']);
    });

    it('matches hybrid cards (not:hybrid)', () => {
        const res = sifter.filter(cards, 'not:hybrid');
        expectNotCardNames(res, [
            'Deathrite Shaman', 'Leyline of the Guildpact',
            'Jegantha, the Wellspring', 'Ajani, Sleeper Agent'
        ]);
        expectCardNames(res, ['Lightning Bolt']);
    });

    it('matches modal cards (not:modal)', () => {
        const res = sifter.filter(cards, 'not:modal');
        // TODO spree
        expectNotCardNames(res, ['Felidar Retreat', 'Rakdos Charm']);
        expectCardNames(res, ['Balance']);
    });

    it('matches historic cards (not:historic)', () => {
        const res = sifter.filter(cards, 'not:historic');
        // TODO: sagas
        expectNotCardNames(res, [
            'Aurelia, the Warleader', 'Black Lotus',
            'The Great Henge', 'Nicol Bolas, Planeswalker', 'Time Vault'
        ]);
        expectCardNames(res, ['Lightning Bolt']);
    });

    it('matches permanents (not:permanent)', () => {
        const res = sifter.filter(cards, 'not:permanent');
        expectNotCardNames(res, [
            'Solemn Simulacrum', 'Arena', 'Tatyova, Benthic Druid',
            'Sol Ring', 'Omniscience'
        ]);
        expectCardNames(res, ['Balance', 'Counterspell']);
    });

    it('matches spells (not:spell)', () => {
        const res = sifter.filter(cards, 'not:spell');
        expectNotCardNames(res, [
            'Lightning Bolt', 'Counterspell', 'Reanimate', 'Sol Ring',
            'Liliana, Dreadhorde General', 'Llanowar Elves',
            'Leyline of the Guildpact', 'Shivan Dragon'
        ]);
        expectCardNames(res, ['Arena', 'City of Brass']);
    });

    it('matches party cards (not:party)', () => {
        const res = sifter.filter(cards, 'not:party');
        expectNotCardNames(res, [
            'Snapcaster Mage', 'Soul Warden',
            'Rograkh, Son of Rohgahh', 'Mirri, Cat Warrior'
        ]);
        expectCardNames(res, ['Lightning Bolt', 'Esper Sentinel']);
    });

    it('matches french vanilla cards (not:frenchvanilla)', () => {
        const res = sifter.filter(cards, 'not:frenchvanilla');
        expectNotCardNames(res, [
            'Sheltering Ancient', 'Fleshwrither', 'Serra Angel',
            'Rograkh, Son of Rohgahh', 'Sire of Seven Deaths',
            'Apex Devastator', 'Phyrexian Fleshgorger',
            'Mirri, Cat Warrior', 'Akroma, Angel of Wrath'
        ]);
        expectCardNames(res, [
            'Black Lotus', 'Dark Ritual',
            'Tatyova, Benthic Druid', 'Rampaging Baloths'
        ]);
    });

    it('matches phyrexian cards (not:phyrexian)', () => {
        const res = sifter.filter(cards, 'not:phyrexian');
        expectNotCardNames(res, [
            'Gitaxian Probe',
            'Ajani, Sleeper Agent',
            'Etali, Primal Conqueror // Etali, Primal Sickness'
        ]);
        expectCardNames(res, ['Lightning Bolt', 'Time Vault']);
    });

    it('matches flip cards (not:flip)', () => {
        const res = sifter.filter(cards, 'not:flip');
        expectNotCardNames(res, ['Budoka Gardener // Dokai, Weaver of Life']);
        expectCardNames(res, [
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
    });

    it('matches meld cards (not:meld)', () => {
        const res = sifter.filter(cards, 'not:meld');
        expectNotCardNames(res, ['Titania, Voice of Gaea']);
        expectCardNames(res, ['Lightning Bolt']);
    });

    it('matches leveler cards (not:leveler)', () => {
        const res = sifter.filter(cards, 'not:leveler');
        expectNotCardNames(res, ['Transcendent Master']);
        expectCardNames(res, ['Felidar Retreat']);
    });

    it('matches vanilla cards (not:vanilla)', () => {
        const res = sifter.filter(cards, 'not:vanilla');
        expectNotCardNames(res, ['Grizzly Bears']);
        expectCardNames(res, ['Aurelia, the Warleader']);
    });
});
