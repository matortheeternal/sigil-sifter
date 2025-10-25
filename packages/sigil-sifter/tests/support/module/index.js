import NameKeyword from './NameKeyword.js';
import SoldKeyword from './SoldKeyword.js';
import PriceKeyword from './PriceKeyword.js';
import Item from './Item.js';

export default function register(sifter) {
    sifter.addKeywords([
        NameKeyword,
        PriceKeyword,
        SoldKeyword,
    ]);

    sifter.setBaseStringParser((sifter, operator, expression) => {
        const keyword = new NameKeyword(sifter);
        keyword.operator = operator;
        keyword.expression = expression;
        keyword.remainingStr = expression.remainingStr;
        return keyword;
    });

    sifter.setInputAdapter(Item);
};
