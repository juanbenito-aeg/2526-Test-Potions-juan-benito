const { Potion } = require("./potion");

class TonicOfDownfall extends Potion{
    constructor(name, type, modifier, value, attribute, ingredients){
        super(name, type, modifier, value, attribute, ingredients);
    }

    static create(ingredients)
    {
        const value = 0;
        const name = "Tonic of Downfall";
        const attribute = "???";
        const type = "failed";
        const modifier = "";
        const ingredientNames = ingredients.map(ingredient => ingredient.name);

        return new TonicOfDownfall(name, type, modifier, value, attribute, ingredientNames);
    }
}

module.exports = {
    TonicOfDownfall
}

