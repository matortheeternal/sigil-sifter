# @sigil-sifter/magic

This is a module which provides the keywords, expressions, and data extensions to filter Magic: The Gathering cards with sigil-sifter.

## installation
```bash
npm i @sigil-sifter/magic
```

## usage
```js
import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import { MagicCard } from '@sigil-sifter/magic/core';

class CardClass extends MagicCard {
    // implement your custom card data wrapper here
    // see the base MagicCard class for all methods
    get names() {
        return [this.card.name];
    }
}

// you can pass the library data to override default
// behavior or enable certain keywords
const GameData = {
    colors: null,
    guilds: null,
    gameFormats: null,
    abilityWords: null,
    languages: null,
    rarities: null,
    sets: null
};

Magic(sifter, CardClass, GameData);

// invoke sifter to filter an array of cards
const cards = [{
    name: 'Black Lotus'
}, {
    name: 'Mox Emerald'
}, {
    name: 'Mox Sapphire'
}]
sifter.filter(cards, 'black lotus'); 
```

## implemented keywords
Pretty much every keyword defined on the [scryfall search syntax](https://scryfall.com/docs/syntax) page is implemented by this module. You can use the `@sigil-sifter/magic-scryfall` package with this module to search downloaded scryfall card data directly.

## unimplemented keywords

**TAGGING**
- otag/oracletag/function
- art/atag/arttag

**PRICING**
- usd
- eur
- tix

**SET**
- block
- year
- date

**PRINTINGS**
- in
- sets
- cheapest
- prints

**OTHERS**
- fulloracle, ~ support in oracle text
- artists
- illustrations
- is:hires
- new
- is:reserved
- is:duelcommander
- is:commander
- is:brawler
- is:companion
- cube
- is:\[product]
- include:extras
- is:funny
- is:bear
- is:\[landgroup]
- is:masterpiece
- order
- prefer
- direction
- unique
