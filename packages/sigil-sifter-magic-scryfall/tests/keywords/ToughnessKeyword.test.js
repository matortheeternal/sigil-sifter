import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames } from '../helpers.js';
import {SearchSyntaxError} from 'sigil-sifter/core';

describe('Toughness keyword', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter, ScryfallCard);
    });

    it('works with tou and toughness', () => {
        const res1 = sifter.filter(cards, 'tou>8');
        const res2 = sifter.filter(cards, 'toughness>8');
        expect(res1).toEqual(res2);
    });

    it('supports greater than (>) operator', () => {
        const res = sifter.filter(cards, 'toughness>5');
        expectCardNames(res, [
            'Zacama, Primal Calamity', 'Blightsteel Colossus', 'Tiamat',
            'Griselbrand', 'Primeval Titan', 'The Gitrog Monster',
            'Morophon, the Boundless', 'Muldrotha, the Gravetide',
            'Rampaging Baloths', 'The Kami War // O-Kagachi Made Manifest'
        ]);
    });

    it('supports less than (<) operator', () => {
        const res = sifter.filter(cards, 'toughness<2');
        expectCardNames(res, [
            'Llanowar Elves', 'Birds of Paradise', 'Esper Sentinel',
            'Ragavan, Nimble Pilferer', 'Soul Warden'
        ]);
    });

    it('supports greater than or equal to (>=) operator', () => {
        const res = sifter.filter(cards, 'toughness>=4');
        expectCardNames(res, [
            'Serra Angel', 'Atraxa, Praetors\' Voice', 'Savage Ventmaw',
            'Korvold, Fae-Cursed King', 'Platinum Angel', 'Shivan Dragon',
            'Inspirit, Flagship Vessel', 'Xenagos, God of Revels',
            'Terror of the Peaks', 'Rampaging Baloths', 'Zacama, Primal Calamity',
            'Primeval Titan', 'The Gitrog Monster', 'Morophon, the Boundless',
            'Muldrotha, the Gravetide', 'Blightsteel Colossus', 'Tiamat',
            'Griselbrand', 'The Kami War // O-Kagachi Made Manifest',
            'Jegantha, the Wellspring'
        ]);
    });

    it('supports less than or equal to (<=) operator', () => {
        const res = sifter.filter(cards, 'tou<=1');
        expectCardNames(res, [
            'Llanowar Elves', 'Birds of Paradise',
            'Esper Sentinel', 'Soul Warden'
        ]);
    });

    it('supports not equal (!=) operator', () => {
        const res = sifter.filter(cards, 'tou!=2 tou!=1 tou!=3');
        expectCardNames(res, [
            'Serra Angel', 'Atraxa, Praetors\' Voice', 'Savage Ventmaw',
            'Korvold, Fae-Cursed King', 'Platinum Angel', 'Jegantha, the Wellspring',
            'Shivan Dragon', 'Inspirit, Flagship Vessel', 'Xenagos, God of Revels',
            'Terror of the Peaks', 'Rampaging Baloths', 'Zacama, Primal Calamity',
            'Primeval Titan', 'The Gitrog Monster', 'Morophon, the Boundless',
            'Muldrotha, the Gravetide', 'Blightsteel Colossus', 'Tiamat',
            'Griselbrand', 'The Kami War // O-Kagachi Made Manifest',
        ]);
    });

    it('supports equal (=) operator', () => {
        const res = sifter.filter(cards, 'tou=2');
        expectCardNames(res, [
            'Solemn Simulacrum', 'Wonder', 'Stoneforge Mystic'
        ]);
    });

    it('supports tou>pow', () => {
        const res = sifter.filter(cards, 'toughness>power');
        expectCardNames(res, [
            'Birds of Paradise', 'Shalai, Voice of Plenty',
            'Raffine, Scheming Seer', 'Stoneforge Mystic',
            'Deathrite Shaman', 'Aurelia, the Warleader'
        ]);
    });

    it('throws with tou:pow', () => {
        expect(() => sifter.filter(cards, 'toughness:power'))
            .toThrowError(
                SearchSyntaxError,
                /includes operator is not supported/i
            );
    });

    it('supports toughness<=power', () => {
        const res = sifter.filter(cards, 'toughness<=power');
        expectCardNames(res, [
            'Wonder', 'Zacama, Primal Calamity', 'Snapcaster Mage',
            'Xenagos, God of Revels', 'Terror of the Peaks'
        ]);
    });

    it('supports toughness=power', () => {
        const res = sifter.filter(cards, 'toughness=power');
        expectCardNames(res, [
            'Solemn Simulacrum', 'Wonder', 'Zacama, Primal Calamity', 'Rampaging Baloths',
            'Serra Angel', 'Atraxa, Praetors\' Voice', 'Korvold, Fae-Cursed King',
            'Platinum Angel', 'Shivan Dragon', 'Inspirit, Flagship Vessel',
            'Primeval Titan', 'The Gitrog Monster', 'Morophon, the Boundless',
            'Muldrotha, the Gravetide', 'Blightsteel Colossus', 'Tiamat', 'Griselbrand',
            'The Kami War // O-Kagachi Made Manifest', 'Jegantha, the Wellspring',
            'Llanowar Elves', 'Soul Warden', 'Esper Sentinel'
        ]);
    });
});
