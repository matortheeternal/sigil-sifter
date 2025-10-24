import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/fixtures.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames } from '../helpers.js';

const sifter = new Sifter();
Magic(sifter, ScryfallCard);

describe('AbilityKeyword keyword', () => {
    it('handles shorthand kw: and full keyword: the same', () => {
        const flying1 = sifter.filter(cards, 'kw:flying');
        const flying2 = sifter.filter(cards, 'keyword:flying');
        expect(flying1).toEqual(flying2);
        expectCardNames(flying1, [
            'Aurelia, the Warleader', 'Wonder', 'Serra Angel',
            'Inspirit, Flagship Vessel', 'Shivan Dragon', 'Atraxa, Praetors\' Voice',
            'Raffine, Scheming Seer', 'Korvold, Fae-Cursed King',
            'Shalai, Voice of Plenty', 'Platinum Angel', 'Birds of Paradise',
            'Tiamat', 'Savage Ventmaw', 'Griselbrand', 'Terror of the Peaks'
        ]);
    });

    it('filters by specific keyword ability (Haste)', () => {
        const haste = sifter.filter(cards, 'kw:haste');
        expectCardNames(haste, ['Aurelia, the Warleader']);
    });

    it('is case-insensitive for keyword names', () => {
        const vigilance1 = sifter.filter(cards, 'kw:vigilance');
        const vigilance2 = sifter.filter(cards, 'kw:VIGILANCE');
        expect(vigilance1).toEqual(vigilance2);
        expectCardNames(vigilance1, [
            'Aurelia, the Warleader', 'Zacama, Primal Calamity',
            'Serra Angel', 'Atraxa, Praetors\' Voice'
        ]);
    });

    it('supports negation', () => {
        const redNonHaste = sifter.filter(cards, '-kw:haste c=R');
        expectCardNames(redNonHaste, [
            'Ragavan, Nimble Pilferer', 'Lightning Bolt', 'Seething Song',
            'Shivan Dragon', 'Blasphemous Act', 'Sneak Attack', 'Goblin Bombardment',
            'Terror of the Peaks',
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
    });

    it('supports multiple keywords with OR', () => {
        const hasteOrTrample = sifter.filter(cards, 'kw:haste OR kw:trample');
        expectCardNames(hasteOrTrample, [
            'Aurelia, the Warleader', 'Zacama, Primal Calamity', 'Rampaging Baloths',
            'Primeval Titan', 'Blightsteel Colossus'
        ]);
    });

    it('supports multiple keywords with AND', () => {
        const hasteAndTrample = sifter.filter(cards, 'kw:flying kw:vigilance');
        expectCardNames(hasteAndTrample, [
            'Aurelia, the Warleader', 'Serra Angel', 'Atraxa, Praetors\' Voice'
        ]);
    });

    it('handles unknown keyword gracefully', () => {
        const bogus = sifter.filter(cards, 'kw:notARealKeyword');
        expect(bogus).toEqual([]);
    });
});
