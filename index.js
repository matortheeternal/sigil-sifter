import GroupParser from './parsers/GroupParser.js';
import './keywords/Template.js';
import './keywords/magic/Artist.js';
import './keywords/magic/CardType.js';
import './keywords/magic/Color.js';
// import './keywords/magic/ColorIdentity.js';
// import './keywords/magic/Devotion.js';
import './keywords/magic/FlavorText.js';
// import './keywords/magic/KeywordAbility.js';
// import './keywords/magic/Language.js';
// import './keywords/magic/ManaCost.js';
// import './keywords/magic/ManaValue.js';
// import './keywords/magic/Produces.js';
import './keywords/magic/Rarity.js';
import './keywords/magic/RulesText.js';
import './keywords/magic/Watermark.js';

export function compile(filterStr) {
    return GroupParser.parse(filterStr);
}

export function filter(objects, filterStr) {
    const compiledFilter = compile(filterStr);
    return objects.filter(obj => compiledFilter.test(obj));
}
