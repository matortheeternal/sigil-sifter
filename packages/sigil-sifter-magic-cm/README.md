# @sigil-sifter/magic-cm

This is a module which provides a data wrapper and keyword modifications for card data from the card magician for use with the `@sigil-sifter/magic` module.

## installation
```bash
npm i @sigil-sifter/magic-cm
```

## usage
```js
import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import CardMagicianCard from '@sigil-sifter/magic-cm/card';
import CardMagicianMagic from '@sigil-sifter/magic-cm';

// Register the Magic module with Sigil Sifter using the Card Magician data adapter.
Magic(sifter, CardMagicianCard);
// Add keywords unique to card magician, and remove keywords it doesn't support
CardMagicianMagic(sifter);

// cards would be some card magician schema card data
// Filter an array of cards — this finds green creatures that are not enchantments.
const greenCreatures = sifter.filter(cards, 'c:G t:creature -t:enchantment');
```
