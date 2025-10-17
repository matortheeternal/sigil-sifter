import { sifter } from "sigil-sifter";
import Magic from "@sigil-sifter/magic";
import cards from "../fixtures/color.json";

beforeAll(() => {
    Magic(sifter);
});

describe("Color keyword", () => {
    test("shorthand c: and full color: behave the same", () => {
        const white1 = sifter.filter(cards, "c=w");
        const white2 = sifter.filter(cards, "color=w");
        expect(white1).toEqual(white2);
        console.log(white1.map(c => [c.name, c.colors]));
    });

    test("filters by individual color names (case-insensitive)", () => {
        const blue = sifter.filter(cards, "c=blue");
        const blueCaps = sifter.filter(cards, "C=BLUE");
        expect(blue).toEqual(blueCaps);
        console.log(blue.map(c => [c.name, c.colors]));
    });

    test("filters by guild (Golgari)", () => {
        const golgari = sifter.filter(cards, "c=golgari");
        console.log(golgari.map(c => [c.name, c.colors]));
    });

    test("filters by wedge (Jund)", () => {
        const jund = sifter.filter(cards, "c=jund");
        console.log(jund.map(c => [c.name, c.colors]));
    });

    test("filters by shard (Esper)", () => {
        const esper = sifter.filter(cards, "c=esper");
        console.log(esper.map(c => [c.name, c.colors]));
    });

    test("filters by 4-color (Growth)", () => {
        const growth = sifter.filter(cards, "c=growth");
        console.log(growth.map(c => [c.name, c.colors]));
    });

    test("filters by all colors (WUBRG)", () => {
        const fiveColor = sifter.filter(cards, "c=wubrg");
        console.log(fiveColor.map(c => [c.name, c.colors]));
    });

    test("filters by colorless", () => {
        const colorless = sifter.filter(cards, "c=c");
        console.log(colorless.map(c => [c.name, c.colors]));
    });

    test("OR operator works (R or B)", () => {
        const wu = sifter.filter(cards, "c=r or c=b");
        console.log(wu.map(c => [c.name, c.colors]));
    });

    test("multiple OR operators", () => {
        const wub = sifter.filter(cards, "c=w or c=g or c=b");
        console.log(wub.map(c => [c.name, c.colors]));
    });

    test("AND combination (G and U)", () => {
        const wu = sifter.filter(cards, "c:g c:u");
        console.log(wu.map(c => [c.name, c.colors]));
    });

    test("negation works (-c=r excludes red)", () => {
        const notWhite = sifter.filter(cards, "-c=r");
        console.log(notWhite.map(c => [c.name, c.colors]));
    });

    test("colon operator (:) means >= (supercolor sets)", () => {
        const atLeastAzorius = sifter.filter(cards, "c:azorius");
        console.log(atLeastAzorius.map(c => [c.name, c.colors]));
    });

    test("comparison operators (<, <=, >, >=)", () => {
        const lessThanAzorius = sifter.filter(cards, "c<azorius");
        console.log(lessThanAzorius.map(c => [c.name, c.colors]));

        const greaterThanAzorius = sifter.filter(cards, "c>azorius");
        console.log(greaterThanAzorius.map(c => [c.name, c.colors]));
    });

    test("empty results return cleanly", () => {
        const results = sifter.filter(cards, "c=r c=u c=g");
        expect(results).toEqual([]);
    });

    test("throws error if both colorless and colored given", () => {
        expect(() => sifter.filter(cards, "c=cw"))
            .toThrow(/cannot be both colorless and colored/i);
    });
});
