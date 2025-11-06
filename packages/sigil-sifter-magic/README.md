# sigil-sifter-magic

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

## unimplemented keywords
- fulloracle, ~ support in oracle text
- artists
- illustrations

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
