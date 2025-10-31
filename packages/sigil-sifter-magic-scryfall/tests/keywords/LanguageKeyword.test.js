import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/multilang.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';
import { SearchSyntaxError } from 'sigil-sifter/core';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('Language keyword', () => {
    it('supports full and shorthand keys', () => {
        const res1 = sifter.filter(cards, 'language:en');
        const res2 = sifter.filter(cards, 'lang:English');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Bighorner Rancher']);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'LaNgUaGe:En');
        const res2 = sifter.filter(cards, 'LANG:ENGLISH');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Bighorner Rancher']);
    });

    it('works with = and : the same', () => {
        const res1 = sifter.filter(cards, 'language=en');
        const res2 = sifter.filter(cards, 'language:en');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Bighorner Rancher']);
    });

    it('works with !=', () => {
        const res = sifter.filter(cards, 'language!=en');
        expectCardNames(res, ['Arachnoid', 'Steppe Glider']);
        expectNotCardNames(res, ['Bighorner Rancher']);
    });

    it('throws for unknown languages', () => {
        expect(() => sifter.filter(cards, 'language:imaginary'))
            .toThrowError(SearchSyntaxError, /Unknown language/);
    });

    it('throws SearchSyntaxError for comparison operators', () => {
        expect(() => sifter.filter(cards, 'language>en'))
            .toThrowError(SearchSyntaxError, /Comparison operators are not supported/);

        expect(() => sifter.filter(cards, 'language<en'))
            .toThrowError(SearchSyntaxError, /Comparison operators are not supported/);
    });

    describe('chinese', () => {
        it('supports simplified chinese', () => {
            const sim1 = sifter.filter(cards, 'language:"Chinese (Simplified)"');
            const sim2 = sifter.filter(cards, 'language:"Simplified Chinese"');
            const sim3 = sifter.filter(cards, 'language:cs');
            expectCardNames(sim1, ['Arachnoid']);
            expect(sim1).toEqual(sim2);
            expect(sim2).toEqual(sim3);
        });

        it('supports traditional chinese', () => {
            const tra1 = sifter.filter(cards, 'language:"Chinese (Traditional)"');
            const tra2 = sifter.filter(cards, 'language:"Traditional Chinese"');
            const tra3 = sifter.filter(cards, 'language:ct');
            expectCardNames(tra1, ['Steppe Glider']);
            expect(tra1).toEqual(tra2);
            expect(tra2).toEqual(tra3);
        })
    });

    describe('ancient and fantasy languages', () => {
        it('handles latin', () => {
            const res1 = sifter.filter(cards, 'language:la');
            const res2 = sifter.filter(cards, 'language:Latin');
            expectCardNames(res1, ['Raging Kavu']);
            expect(res1).toEqual(res2);
        });

        it('handles ancient greek', () => {
            const res1 = sifter.filter(cards, 'language:grc');
            const res2 = sifter.filter(cards, 'language:"Ancient Greek"');
            expectCardNames(res1, ['Sokrates, Athenian Teacher']);
            expect(res1).toEqual(res2);
        });

        it('handles phyrexian', () => {
            const res1 = sifter.filter(cards, 'language:ph');
            const res2 = sifter.filter(cards, 'language:Phyrexian');
            expectCardNames(res1, ['Jin-Gitaxias, Core Augur']);
            expect(res1).toEqual(res2);
        });
    });

    describe('other languages', () => {
        it('handles spanish', () => {
            const res1 = sifter.filter(cards, 'lang:es');
            const res2 = sifter.filter(cards, 'language:Spanish');
            expectCardNames(res1, ['Scent of Jasmine']);
            expect(res1).toEqual(res2);
        });

        it('handles french', () => {
            const res1 = sifter.filter(cards, 'lang:fr');
            const res2 = sifter.filter(cards, 'language:French');
            expectCardNames(res1, ['Thornwood Falls']);
            expect(res1).toEqual(res2);
        });

        it('handles german', () => {
            const res1 = sifter.filter(cards, 'lang:de');
            const res2 = sifter.filter(cards, 'language:German');
            expectCardNames(res1, ['Reinterpret']);
            expect(res1).toEqual(res2);
        });

        it('handles italian', () => {
            const res1 = sifter.filter(cards, 'lang:it');
            const res2 = sifter.filter(cards, 'language:Italian');
            expectCardNames(res1, ['Oblivion Ring']);
            expect(res1).toEqual(res2);
        });

        it('handles portuguese', () => {
            const res1 = sifter.filter(cards, 'lang:pt');
            const res2 = sifter.filter(cards, 'language:Portuguese');
            expectCardNames(res1, ['Dromoka Captain']);
            expect(res1).toEqual(res2);
        });

        it('handles japanese', () => {
            const res1 = sifter.filter(cards, 'lang:ja');
            const res2 = sifter.filter(cards, 'language:Japanese');
            expectCardNames(res1, ['Caldaia Strongarm']);
            expect(res1).toEqual(res2);
        });

        it('handles korean', () => {
            const res1 = sifter.filter(cards, 'lang:ko');
            const res2 = sifter.filter(cards, 'language:Korean');
            expectCardNames(res1, ['The Three Seasons']);
            expect(res1).toEqual(res2);
        });

        it('handles russian', () => {
            const res1 = sifter.filter(cards, 'lang:ru');
            const res2 = sifter.filter(cards, 'language:Russian');
            expectCardNames(res1, ['Nettle Sentinel']);
            expect(res1).toEqual(res2);
        });

        it('handles hebrew', () => {
            const res1 = sifter.filter(cards, 'lang:he');
            const res2 = sifter.filter(cards, 'language:Hebrew');
            expectCardNames(res1, ['Glory']);
            expect(res1).toEqual(res2);
        });

        it('handles arabic', () => {
            const res1 = sifter.filter(cards, 'lang:ar');
            const res2 = sifter.filter(cards, 'language:Arabic');
            expectCardNames(res1, ['Stone-Tongue Basilisk']);
            expect(res1).toEqual(res2);
        });

        it('handles sanskrit', () => {
            const res1 = sifter.filter(cards, 'lang:sa');
            const res2 = sifter.filter(cards, 'language:Sanskrit');
            expectCardNames(res1, ['Fungal Shambler']);
            expect(res1).toEqual(res2);
        });
    });
});
