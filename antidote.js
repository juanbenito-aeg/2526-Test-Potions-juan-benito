const { Potion } = require("./potion");


class Antidote extends Potion{

    constructor(name, type, modifier, value, attribute, ingredients){
        super(name, type, modifier, value, attribute, ingredients);
    }

    static create(ingredients, attribute)
    {

        const numIngredientsOfEachModifier = Antidote.getNumIngredientsOfEachModifier(ingredients);     
        
        const value = Antidote.calculateValue(numIngredientsOfEachModifier);

        const attributeParts = attribute.split("_");

        const name = attribute === "hit_points" ? "Antidote of restore " + attributeParts[0] + " " + attributeParts[1] :
                                                  "Antidote of restore " + attributeParts[0];
        
        
        const type = "antidote";
        const ingredientNames = ingredients.map(ingredient => ingredient.name);
        const modifier = "";

        return new Antidote(name, type, modifier, value, attribute, ingredientNames);
    }

    static calculateValue(numIngredientsOfEachModifier) {

        const modifierPoints = [1, 2, 3, 4];

        let value = 0;

        for (let i = 0; i < numIngredientsOfEachModifier.length; i++) {
            value += numIngredientsOfEachModifier[i] * modifierPoints[i];
        }
             
        return value;
    }
    
}

module.exports = {
    Antidote
}