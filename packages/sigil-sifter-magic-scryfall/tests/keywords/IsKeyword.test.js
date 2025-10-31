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

describe('is: keyword', () => {
    it('matches double-faced cards (is:dfc)', () => {
        const res = sifter.filter(cards, 'is:dfc');
        expectCardNames(res, [
            'Fell the Profane // Fell Mire', 'Wear // Tear', 'Crime // Punishment',
            'The Kami War // O-Kagachi Made Manifest', 'Trial // Error'
        ]);
        expectNotCardNames(res, ['Solemn Simulacrum', 'Lightning Bolt']);
    });

    it('matches modal double-faced cards (is:mdfc)', () => {
        const res = sifter.filter(cards, 'is:mdfc');
        expectCardNames(res, [
            'Fell the Profane // Fell Mire',
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
        expectNotCardNames(res, ['Crime // Punishment']);
    });

    it('matches transform cards (is:transform)', () => {
        const res = sifter.filter(cards, 'is:transform');
        expectCardNames(res, ['The Kami War // O-Kagachi Made Manifest']);
        expectNotCardNames(res, ['Fell the Profane // Fell Mire']);
    });

    it('matches split cards (is:split)', () => {
        const res = sifter.filter(cards, 'is:split');
        expectCardNames(res, [
            'Wear // Tear', 'Trial // Error',
            'Crime // Punishment'
        ]);
        expectNotCardNames(res, ['The Kami War // O-Kagachi Made Manifest']);
    });

    it('matches hybrid cards (is:hybrid)', () => {
        const res = sifter.filter(cards, 'is:hybrid');
        expectCardNames(res, [
            'Deathrite Shaman', 'Leyline of the Guildpact',
            'Jegantha, the Wellspring', 'Ajani, Sleeper Agent'
        ]);
        expectNotCardNames(res, ['Lightning Bolt']);
    });

    it('matches modal cards (is:modal)', () => {
        const res = sifter.filter(cards, 'is:modal');
        // TODO spree
        expectCardNames(res, ['Felidar Retreat', 'Rakdos Charm']);
        expectNotCardNames(res, ['Balance']);
    });

    it('matches historic cards (is:historic)', () => {
        const res = sifter.filter(cards, 'is:historic');
        // TODO: sagas
        expectCardNames(res, [
            'Aurelia, the Warleader', 'Black Lotus',
            'The Great Henge', 'Nicol Bolas, Planeswalker', 'Time Vault'
        ]);
        expectNotCardNames(res, ['Lightning Bolt']);
    });

    it('matches permanents (is:permanent)', () => {
        const res = sifter.filter(cards, 'is:permanent');
        expectCardNames(res, [
            'Solemn Simulacrum', 'Arena', 'Tatyova, Benthic Druid',
            'Sol Ring', 'Omniscience'
        ]);
        expectNotCardNames(res, ['Balance', 'Counterspell']);
    });

    it('matches spells (is:spell)', () => {
        const res = sifter.filter(cards, 'is:spell');
        expectCardNames(res, [
            'Lightning Bolt', 'Counterspell', 'Reanimate', 'Sol Ring',
            'Liliana, Dreadhorde General', 'Llanowar Elves',
            'Leyline of the Guildpact', 'Shivan Dragon'
        ]);
        expectNotCardNames(res, ['Arena', 'City of Brass']);
    });

    it('matches party cards (is:party)', () => {
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

    it('matches phyrexian cards (is:phyrexian)', () => {
        const res = sifter.filter(cards, 'is:phyrexian');
        expectCardNames(res, [
            'Gitaxian Probe',
            'Ajani, Sleeper Agent',
            'Etali, Primal Conqueror // Etali, Primal Sickness'
        ]);
        expectNotCardNames(res, ['Lightning Bolt', 'Time Vault']);
    });

    it('matches flip cards (is:flip)', () => {
        const res = sifter.filter(cards, 'is:flip');
        expectCardNames(res, ['Budoka Gardener // Dokai, Weaver of Life']);
        expectNotCardNames(res, [
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
    });

    it('matches meld cards (is:meld)', () => {
        const res = sifter.filter(cards, 'is:meld');
        expectCardNames(res, ['Titania, Voice of Gaea']);
        expectNotCardNames(res, ['Lightning Bolt']);
    });

    it('matches leveler cards (is:leveler)', () => {
        const res = sifter.filter(cards, 'is:leveler');
        expectCardNames(res, ['Transcendent Master']);
        expectNotCardNames(res, ['Felidar Retreat']);
    });

    it('matches vanilla cards (is:vanilla)', () => {
        const res = sifter.filter(cards, 'is:vanilla');
        expectCardNames(res, ['Grizzly Bears']);
        expectNotCardNames(res, ['Aurelia, the Warleader']);
    });
});
