# Sigil Sifter 🔮
[![Tests](https://github.com/matortheeternal/sigil-sifter/actions/workflows/tests.yml/badge.svg)](https://github.com/matortheeternal/sigil-sifter/actions/workflows/tests.yml)
[![codecov](https://codecov.io/github/matortheeternal/sigil-sifter/graph/badge.svg?token=O2MWBZTSSL)](https://codecov.io/github/matortheeternal/sigil-sifter)

**Sigil Sifter** is a search syntax that can be used to filter objects using plaintext queries, inspired by [Scryfall syntax](https://scryfall.com/docs/syntax).

## About

Sigil Sifter gives you a strong foundation to build a text query search system for your needs.

It supports **nesting, multiple operators, regular expressions, and custom keywords out of the box**.  
You can also find ready-made modules for searching certain datasets, like [Magic: the Gathering cards](packages/sigil-sifter-magic).

## Features
- 🔌 **Easily extensible system** — Add your own custom keywords to search specific fields in your data.
- 🧩 **Rich syntax support** — Nesting, boolean operators, and comparison operators included.
- 🧪 **Regex support** — Match complex patterns using full regular expressions.
- 📦 **Modular design** — Plug in domain-specific modules (e.g. Magic cards) or build your own.
- ⚡ **Fast filtering** — Optimized for searching large arrays of objects.

## Getting Started

### Prerequisites
- Node.js (>= v18)
- npm or yarn

### Installation
```bash
npm install sigil-sifter
```

## Usage

Here’s a practical example using the Magic: the Gathering module:
```js
import { sifter } from 'sigil-sifter';
import Magic from '@sigil-sifter/magic'; 
import ScryfallCard from '@sigil-sifter/magic-scryfall';

// Register the Magic module with Sigil Sifter using the Scryfall data adapter.
Magic(sifter, ScryfallCard);

// cards would be some input data, e.g. the scryfall database.
// Filter an array of cards — this finds green creatures that are not enchantments.
const greenCreatures = sifter.filter(cards, 'c:G t:creature -t:enchantment');
```

## Contributing

Contributions are welcome! Please open an issue or pull request if you’d like to help improve Sigil Sifter.

## License

Distributed under the MIT License. See LICENSE for details.
