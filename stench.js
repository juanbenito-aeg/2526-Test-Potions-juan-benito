
const { Potion } = require("./potion");


class Stench extends Potion{

    constructor(name, type, modifier, value, attribute, ingredients){
        super(name, type, modifier, value, attribute, ingredients);
    }

    static create(ingredients)
    {
        const numIngredientsOfEachModifier = Stench.getNumIngredientsOfEachModifier(ingredients);
        const isPotionBoosted = Stench.isPotionBoosted(numIngredientsOfEachModifier, ingredients.length);

        const value = Stench.calculateValue(ingredients, isPotionBoosted);
        const modifier = Stench.getModifier(numIngredientsOfEachModifier);

        const name = modifier != "" ? "Stench of " + modifier + " damage" : "Stench of damage";
        const attribute = "hit_points";
        const type = "stench";
        const ingredientNames = ingredients.map(ingredient => ingredient.name);

        return new Stench(name, type, modifier, value, attribute, ingredientNames);
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
            return -Math.ceil(totalValue * (1 + (Math.pow(2, ingredients.length - 2 + 1) / 10)));    
        }
        else {
            //Los ingredientes son de distinto tipo
            return -totalValue;
    
        }
    }
    
}

module.exports = {
    Stench
}