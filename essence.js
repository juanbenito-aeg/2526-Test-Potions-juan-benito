
const { Potion } = require("./potion");


class Essence extends Potion{

    constructor(name, type, modifier, value, attribute, ingredients){
        super(name, type, modifier, value, attribute, ingredients);
    }

    static create(ingredients)
    {
        const numIngredientsOfEachModifier = Essence.getNumIngredientsOfEachModifier(ingredients);
        const isPotionBoosted = Essence.isPotionBoosted(numIngredientsOfEachModifier, ingredients.length);

        const value = Essence.calculateValue(ingredients, isPotionBoosted);
        const modifier = Essence.getModifier(numIngredientsOfEachModifier);

        const name = modifier != "" ? "Essence of " + modifier + " heal" : "Essence of heal";
        const attribute = "hit_points";
        const type = "essence";
        const ingredientNames = ingredients.map(ingredient => ingredient.name);

        return new Essence(name, type, modifier, value, attribute, ingredientNames);
    }

    static isPotionBoosted(numIngredientsOfEachModifier, totalIngredients)
    {
        let isPotionBoosted = false;

        numIngredientsOfEachModifier.forEach(numIngredientOfCurrentModifier => {

            if (numIngredientOfCurrentModifier === totalIngredients) 
                isPotionBoosted = true;
            
        });

        return isPotionBoosted;
    }

    static calculateValue(ingredients, isPotionBoosted) {
    
        const values = ingredients.map(ingredient => ingredient.value); 
    
        const totalValue =  values.reduce( (accumulator, currentValue) => 
                accumulator + currentValue, 0);
    
        if (isPotionBoosted) {
            //Todos los ingredientes son del mismo tipo
            return Math.ceil(totalValue * (1 + (Math.pow(2, ingredients.length - 2 + 1) / 10)));    
        }
        else {
            //Los ingredientes son de distinto tipo
            return totalValue;
    
        }
    }
    
}

module.exports = {
    Essence
}