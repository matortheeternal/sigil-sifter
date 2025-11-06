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

describe('SetType keyword', () => {
    it('matches cards by set type', () => {
        const res = sifter.filter(cards, 'st:core');
        expectCardNames(res, [
            'Doubling Season',
            'Aurelia, the Warleader',
            'Felidar Retreat',
            'Llanowar Elves',
            'Serra Angel',
            'Omniscience',
            'Muldrotha, the Gravetide',
            'Sire of Seven Deaths'
        ]);
        expectNotCardNames(res, ['Solemn Simulacrum', 'Abrupt Decay']);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'SETTYPE:CORE');
        const res2 = sifter.filter(cards, 'settype:core');
        expect(res1).toEqual(res2);
    });

    it('supports short key alias st', () => {
        const res1 = sifter.filter(cards, 'st:core');
        const res2 = sifter.filter(cards, 'settype:core');
        expect(res1).toEqual(res2);
    });

    it('treats : and = operators the same', () => {
        const res1 = sifter.filter(cards, 'st=core');
        const res2 = sifter.filter(cards, 'st:core');
        expect(res1).toEqual(res2);
    });

    it('matches commander set type', () => {
        const res = sifter.filter(cards, 'st:commander');
        expectCardNames(res, [
            'Solemn Simulacrum',
            'Akroma, Angel of Wrath',
            'Wonder',
            'Zacama, Primal Calamity',
            'Seething Song',
            'Sol Ring',
            'Aura Shards',
            'Rakdos Charm',
            'Trial // Error',
            'The Gitrog Monster'
        ]);
        expectNotCardNames(res, ['Doubling Season', 'Omniscience']);
    });

    it('matches expansion set type', () => {
        const res = sifter.filter(cards, 'st:expansion');
        expectCardNames(res, [
            'Transcendent Master',
            'Gitaxian Probe',
            'Ruinous Ultimatum',
            'Ajani, Sleeper Agent',
            'Void Rend',
            'Oko, Thief of Crowns',
            'Leyline of the Guildpact'
        ]);
    });

    it('matches masters set type', () => {
        const res = sifter.filter(cards, 'st:masters');
        expectCardNames(res, [
            'Balance',
            'Mirari\'s Wake',
            'Damnation',
            'Teferi, Time Raveler',
            'Primeval Titan',
            'Rancor',
            'Birds of Paradise'
        ]);
    });

    it('matches draft innovation set type', () => {
        const res = sifter.filter(cards, 'st:draft_innovation');
        expectCardNames(res, [
            'Ragavan, Nimble Pilferer',
            'Goblin Bombardment',
            'Lightning Bolt',
            'The One Ring'
        ]);
    });

    it('matches token set type', () => {
        const res = sifter.filter(cards, 'st:token');
        expectCardNames(res, ['Tarmogoyf']);
    });

    it('returns empty array for unknown set type', () => {
        const res = sifter.filter(cards, 'settype:notrealtype');
        expect(res.length).toEqual(0);
    });
});
