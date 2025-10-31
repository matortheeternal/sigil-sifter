import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';
import { SearchSyntaxError } from 'sigil-sifter/core';

describe('ManaCost keyword', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter, ScryfallCard);
    });

    it('compares strictly fewer symbols as less than', () => {
        const res = sifter.filter(cards, 'mana<{r}{r}');
        expectCardNames(res, ['Ragavan, Nimble Pilferer', 'Lightning Bolt']);
    });

    it('compares strictly more symbols as greater than', () => {
        const res = sifter.filter(cards, 'm>{B/G}');
        expectCardNames(res, ['Leyline of the Guildpact']);
        expectNotCardNames(res, ['Deathrite Shaman', 'Abrupt Decay']);
    });

    it('treats different symbol types as not equal', () => {
        const res = sifter.filter(cards, 'mana!={W}{W}');
        expectCardNames(res, ['Counterspell', 'Abrupt Decay']);
    });

    it('compares generic mana directly', () => {
        const greater = sifter.filter(cards, 'm>{2}');
        expectCardNames(greater, ['Doubling Season', 'The One Ring']);

        const less = sifter.filter(cards, 'm<{2}');
        expectCardNames(less, ['Sol Ring', 'Black Lotus']);
        expectNotCardNames(less, [
            'Ragavan, Nimble Pilferer', 'Llanowar Elves',
            'Snapcaster Mage', 'Stoneforge Mystic'
        ]);
    });

    it('treats infinite as greater than any generic', () => {
        const res = sifter.filter(cards, 'm>={I}');
        expectNotCardNames(res, ['Blightsteel Colossus']);
    });

    it('equals works correctly', () => {
        const res = sifter.filter(cards, 'm={1}{G}');
        expectCardNames(res, ['Kenrith\'s Transformation', 'Tarmogoyf']);
    });

    it('not equal works correctly', () => {
        const res = sifter.filter(cards, 'm!={3}{W}');
        expectNotCardNames(res, [
            'Felidar Retreat', 'Smothering Tithe'
        ]);
    });

    it('greater than or equal works correctly', () => {
        const res = sifter.filter(cards, 'm>={3}{U}');
        expectCardNames(res, ['Wonder', 'Force of Will']);
    });

    it('less than or equal works correctly', () => {
        const res = sifter.filter(cards, 'm<={1}{W}');
        expectCardNames(res, [
            'Stoneforge Mystic', 'Balance', 'All That Glitters',
            'Soul Warden', 'Pact of Negation'
        ]);
        expectNotCardNames(res, ['Smothering Tithe']);
    });

    it('includes operator uses >= semantics', () => {
        const res = sifter.filter(cards, 'm:{R}');
        expectCardNames(res, [
            'Seething Song', 'Ragavan, Nimble Pilferer',
            'Lightning Bolt', 'Aurelia, the Warleader'
        ]);
    });

    it('handles split cards and double-faced cards', () => {
        const res = sifter.filter(cards, 'm={W}');
        expectCardNames(res, ['Wear // Tear', 'Esper Sentinel', 'Soul Warden']);
    });

    it('handles 0-cost cards', () => {
        const res = sifter.filter(cards, 'm={0}');
        expectCardNames(res, ['Black Lotus', 'Pact of Negation']);
    });

    it('treats lands as mana cost < {0}', () => {
        const res = sifter.filter(cards, 'm<{0}');
        expectCardNames(res, ['Gaea\'s Cradle', 'Arena']);
        expectNotCardNames(res, ['Black Lotus', 'Pact of Negation']);
    })

    it('throws with invalid mana expression', () => {
        expect(() => sifter.filter(cards, 'm<{%}'))
            .toThrowError(
                SearchSyntaxError,
                'Failed to parse mana cost "{%}"'
            );
    });
});
