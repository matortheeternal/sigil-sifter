import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/fixtures.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import {expectCardNames, expectNotCardNames} from '../helpers.js';

const sifter = new Sifter();
Magic(sifter, ScryfallCard);

describe('RulesText keyword', () => {
    it('handles shorthand o: and full oracle: the same', () => {
        const res1 = sifter.filter(cards, 'o:"When this creature enters"');
        const res2 = sifter.filter(cards, 'oracle:"When this creature enters"');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Solemn Simulacrum', 'Snapcaster Mage', 'Stoneforge Mystic'
        ]);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'O:/deals \\d+ damage/');
        const res2 = sifter.filter(cards, 'ORACLE:/DEALS \\d+ DAMAGE/');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Zacama, Primal Calamity', 'Lightning Bolt', 'Mayhem Devil',
            'Annie Joins Up', 'Rakdos Charm', 'Goblin Bombardment',
            'Blasphemous Act', 'City of Brass', 'Nicol Bolas, Planeswalker',
            'Talisman of Creativity'
        ]);
    });

    it('supports negation', () => {
        const res = sifter.filter(cards, '-o:/When(ever)?/');
        expectNotCardNames(res, [
            'The One Ring', 'Ragavan, Nimble Pilferer', 'Rampaging Baloths'
        ]);
        expectCardNames(res, [
            'Call the Spirit Dragons', 'Tarmogoyf', 'Lightning Bolt'
        ]);
    });

    it('supports multiple keywords', () => {
        const res = sifter.filter(cards, 'o:landfall o:token');
        expectCardNames(res, ['Rampaging Baloths', 'Felidar Retreat']);
    });

    it('supports multiple keywords with OR', () => {
        const res = sifter.filter(cards, 'o:"Destroy target" OR o:"Exile target"');
        expectCardNames(res, [
            'Zacama, Primal Calamity', 'The Kami War // O-Kagachi Made Manifest',
            'Rakdos Charm', 'Nature\'s Claim', 'Void Rend', 'Aura Shards',
            'Murder', 'Wear // Tear', 'Anguished Unmaking', 'Swords to Plowshares',
            'Fell the Profane // Fell Mire', 'Nicol Bolas, Planeswalker',
            'Abrupt Decay', 'Deathrite Shaman'
        ]);
    });

    it('works with equality operators', () => {
        const res1 = sifter.filter(cards, 'oracle="Add {B}{B}{B}."');
        const res2 = sifter.filter(cards, 'oracle!="Add {B}{B}{B}."');
        expectCardNames(res1, ['Dark Ritual']);
        expectNotCardNames(res2, ['Dark Ritual']);
    });
});
