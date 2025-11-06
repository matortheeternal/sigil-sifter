import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';
import { SearchSyntaxError } from 'sigil-sifter/core';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('Format keyword', () => {
    it('matches cards legal in Standard', () => {
        const res = sifter.filter(cards, 'format:standard');
        debugger;
        expectCardNames(res, [
            'Felidar Retreat', 'Liliana, Dreadhorde General',
            'Sire of Seven Deaths', 'Caretaker\'s Talent',
            'Omniscience',
        ]);
        expectNotCardNames(res, ['Black Lotus', 'Gaea\'s Cradle']);
    });

    it('matches cards legal in Modern', () => {
        const res = sifter.filter(cards, 'format:modern');
        expectCardNames(res, [
            'Doubling Season', 'Ragavan, Nimble Pilferer',
            'Grizzly Bears', 'Braids, Cabal Minion',
        ]);
        expectNotCardNames(res, ['Black Lotus', 'Time Vault']);
    });

    it('matches cards legal in Commander', () => {
        const res = sifter.filter(cards, 'format:commander');
        expectCardNames(res, [
            'Abrupt Decay', 'Doubling Season', 'Gitaxian Probe',
            'Atraxa, Praetors\' Voice', 'Solemn Simulacrum',
            'Smothering Tithe',
        ]);
        expectNotCardNames(res, ['Primeval Titan', 'Tarmogoyf', 'Griselbrand']);
    });

    it('matches cards legal in Pauper', () => {
        const res = sifter.filter(cards, 'format:pauper');
        expectCardNames(res, [
            'Dark Ritual', 'Soul Warden',
            'Nature\'s Claim', 'Rancor',
        ]);
        expectNotCardNames(res, ['Doubling Season', 'Gaea\'s Cradle']);
    });

    it('matches cards legal in Future format', () => {
        const res = sifter.filter(cards, 'format:future');
        expectCardNames(res, [
            'Aurelia, the Warleader', 'Felidar Retreat',
            'Tatyova, Benthic Druid', 'Rampaging Baloths'
        ]);
        expectNotCardNames(res, [
            'Fell the Profane // Fell Mire',
            'Black Lotus', 'Nicol Bolas, Planeswalker'
        ]);
    });

    it('matches cards legal in Historic format', () => {
        const res = sifter.filter(cards, 'format:historic');
        expectCardNames(res, ['Felidar Retreat', 'Omniscience']);
        expectNotCardNames(res, ['Time Vault', 'Balance']);
    });

    it('matches cards legal in Timeless format', () => {
        const res = sifter.filter(cards, 'format:timeless');
        expectCardNames(res, ['Doubling Season', 'Smothering Tithe']);
        expectNotCardNames(res, ['Black Lotus', 'Tariff']);
    });

    it('matches cards legal in Gladiator format', () => {
        const res = sifter.filter(cards, 'format:gladiator');
        expectCardNames(res, ['Omniscience', 'Atraxa, Praetors\' Voice']);
        expectNotCardNames(res, ['Black Lotus', 'Knight of the Kitchen Sink']);
    });

    it('matches cards legal in Pioneer format', () => {
        const res = sifter.filter(cards, 'format:pioneer');
        expectCardNames(res, ['Felidar Retreat', 'Omniscience', 'Tatyova, Benthic Druid']);
        expectNotCardNames(res, ['Balance', 'Tariff']);
    });

    it('matches cards legal in Legacy format', () => {
        const res = sifter.filter(cards, 'format:legacy');
        expectCardNames(res, [
            'Griselbrand', 'Arena', 'Gaea\'s Cradle',
            'Timeless Lotus', 'Tariff',
        ]);
        expectNotCardNames(res, ['Black Lotus', 'Sol Ring']);
    });

    it('matches cards legal in Vintage format', () => {
        const res = sifter.filter(cards, 'format:vintage');
        expectCardNames(res, [
            'Doubling Season', 'Oko, Thief of Crowns',
            'Inspirit, Flagship Vessel', 'Force of Will',
            'Black Lotus', 'Sol Ring', 'Time Vault'
        ]);
        expectNotCardNames(res, ['Knight of the Kitchen Sink']);
    });

    it('matches cards legal in Penny format', () => {
        const res = sifter.filter(cards, 'format:penny');
        expectCardNames(res, [
            'Korvold, Fae-Cursed King', 'Tamiyo, Field Researcher',
            'Shalai, Voice of Plenty', 'Trial // Error'
        ]);
        expectNotCardNames(res, ['Rancor', 'Reanimate']);
    });

    it('matches cards legal in Oathbreaker format', () => {
        const res = sifter.filter(cards, 'format:oathbreaker');
        expectCardNames(res, ['Arena', 'Diabolic Tutor']);
        expectNotCardNames(res, [
            'Balance', 'Knight of the Kitchen Sink',
            'Dark Ritual', 'Sol Ring', 'Time Vault'
        ]);
    });

    it('matches cards legal in Standard Brawl format', () => {
        const res = sifter.filter(cards, 'format:standardbrawl');
        expectCardNames(res, ['Felidar Retreat']);
        expectNotCardNames(res, ['Transcendent Master']);
    });

    it('matches cards legal in Brawl format', () => {
        const res = sifter.filter(cards, 'format:brawl');
        expectCardNames(res, ['Felidar Retreat', 'Omniscience']);
        expectNotCardNames(res, ['Akroma, Angel of Wrath']);
    });

    it('matches cards legal in Alchemy format', () => {
        const res = sifter.filter(cards, 'format:alchemy');
        expectCardNames(res, ['Solemn Simulacrum', 'Doubling Season']);
        expectNotCardNames(res, ['Nicol Bolas, Planeswalker']);
    });

    it('matches cards legal in Pauper Commander format', () => {
        const res = sifter.filter(cards, 'format:paupercommander');
        expectCardNames(res, ['Soul Warden', 'Dark Ritual']);
        expectNotCardNames(res, ['Doubling Season']);
    });

    it('matches cards legal in Duel Commander format', () => {
        const res = sifter.filter(cards, 'format:duel');
        expectCardNames(res, ['Atraxa, Praetors\' Voice', 'Primeval Titan']);
        expectNotCardNames(res, ['Black Lotus']);
    });

    it('matches cards legal in Old School format', () => {
        const res = sifter.filter(cards, 'format:oldschool');
        expect(res.length).toEqual(0);
    });

    it('matches cards legal in Premodern format', () => {
        const res = sifter.filter(cards, 'format:premodern');
        expectCardNames(res, [
            'Akroma, Angel of Wrath', 'Aura Shards',
            'Diabolic Tutor', 'Grizzly Bears'
        ]);
        expectNotCardNames(res, [
            'Doubling Season', 'Felidar Retreat',
            'Talisman of Creativity', 'Balance'
        ]);
    });

    it('matches cards legal in Predh format', () => {
        const res = sifter.filter(cards, 'format:predh');
        expectCardNames(res, ['Gitaxian Probe', 'Wonder', 'Stoneforge Mystic']);
        expectNotCardNames(res, ['Deathrite Shaman', 'Zacama, Primal Calamity']);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'format:commander');
        const res2 = sifter.filter(cards, 'FORMAT:COMMANDER');
        expect(res1).toEqual(res2);
    });

    it('supports both format: and f: syntax', () => {
        const res1 = sifter.filter(cards, 'format:modern');
        const res2 = sifter.filter(cards, 'f:modern');
        expect(res1).toEqual(res2);
    });

    it('treats = and : operators equivalently', () => {
        const res1 = sifter.filter(cards, 'format=modern');
        const res2 = sifter.filter(cards, 'format:modern');
        expect(res1).toEqual(res2);
    });

    it('throws SearchSyntaxError for unsupported formats', () => {
        expect(() => sifter.filter(cards, 'format:highlander'))
            .toThrowError(SearchSyntaxError, /Unknown game format "highlander"/);
    });
});
