# @sigil-sifter/magic-scryfall

This is a module which provides a data wrapper for card data from the scryfall API for use with the `@sigil-sifter/magic` module.

## installation
```bash
npm i @sigil-sifter/magic-scryfall
```

## usage
```js
import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import ScryfallCard from '@sigil-sifter/magic-scryfall';

// Register the Magic module with Sigil Sifter using the Scryfall data adapter.
Magic(sifter, ScryfallCard);

// cards would be some scryfall-schema card data
// Filter an array of cards — this finds green creatures that are not enchantments.
const greenCreatures = sifter.filter(cards, 'c:G t:creature -t:enchantment');
```
