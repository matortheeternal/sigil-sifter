import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/fixtures.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames } from '../helpers.js';

describe('Power keyword', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter, ScryfallCard);
    });

    it('works with pow and power', () => {
        const res1 = sifter.filter(cards, 'pow>8');
        const res2 = sifter.filter(cards, 'power>8');
        expect(res1).toEqual(res2);
    });

    it('supports greater than (>) operator', () => {
        const res = sifter.filter(cards, 'power>5');
        expectCardNames(res, [
            'Zacama, Primal Calamity', 'Blightsteel Colossus', 'Tiamat',
            'Griselbrand', 'Primeval Titan', 'The Gitrog Monster',
            'Morophon, the Boundless', 'Muldrotha, the Gravetide',
            'Rampaging Baloths', 'The Kami War // O-Kagachi Made Manifest'
        ]);
    });

    it('supports less than (<) operator', () => {
        const res = sifter.filter(cards, 'power<2');
        expectCardNames(res, [
            'Llanowar Elves', 'Birds of Paradise', 'Stoneforge Mystic',
            'Esper Sentinel', 'Soul Warden', 'Deathrite Shaman'
        ]);
    });

    it('supports greater than or equal to (>=) operator', () => {
        const res = sifter.filter(cards, 'power>=4');
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
        const res = sifter.filter(cards, 'power<=1');
        expectCardNames(res, [
            'Llanowar Elves', 'Birds of Paradise', 'Stoneforge Mystic',
            'Esper Sentinel', 'Soul Warden', 'Deathrite Shaman'
        ]);
    });

    it('supports not equal (!=) operator', () => {
        const res = sifter.filter(cards, 'power!=2 power!=1 power!=3');
        expectCardNames(res, [
            'Birds of Paradise', 'Serra Angel', 'Atraxa, Praetors\' Voice',
            'Savage Ventmaw', 'Korvold, Fae-Cursed King', 'Platinum Angel',
            'Shivan Dragon', 'Inspirit, Flagship Vessel', 'Xenagos, God of Revels',
            'Terror of the Peaks', 'Rampaging Baloths', 'Zacama, Primal Calamity',
            'Primeval Titan', 'The Gitrog Monster', 'Morophon, the Boundless',
            'Muldrotha, the Gravetide', 'Blightsteel Colossus', 'Tiamat',
            'Griselbrand', 'The Kami War // O-Kagachi Made Manifest',
            'Jegantha, the Wellspring'
        ]);
    });

    it('supports equal (=) operator', () => {
        const res = sifter.filter(cards, 'power=2');
        expectCardNames(res, [
            'Solemn Simulacrum', 'Wonder', 'Snapcaster Mage', 'Ragavan, Nimble Pilferer'
        ]);
    });

    it('supports pow>tou (power greater than toughness)', () => {
        debugger;
        const res = sifter.filter(cards, 'pow>tou');
        expectCardNames(res, [
            'Snapcaster Mage', 'Ragavan, Nimble Pilferer',
            'Xenagos, God of Revels', 'Terror of the Peaks'
        ]);
    });

    it('supports pow=tou (power equals toughness)', () => {
        const res = sifter.filter(cards, 'pow=tou');
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
