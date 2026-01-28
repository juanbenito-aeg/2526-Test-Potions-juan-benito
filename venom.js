
const { Potion } = require("./potion");


class Venom extends Potion{

    constructor(name, type, modifier, value, attribute, ingredients){
        super(name, type, modifier, value, attribute, ingredients);
    }

    static create(ingredients, attribute)
    {
        const numIngredientsOfEachModifier = Venom.getNumIngredientsOfEachModifier(ingredients);
       
        const value = Venom.calculateValue(ingredients);
        const modifier = Venom.getModifier(numIngredientsOfEachModifier);
        

        const type = "venom";

        const name = modifier != "" ?   modifier.substring(0,1).toUpperCase() + modifier.substring(1) + " " + attribute + " " + type :
                                        attribute.substring(0,1).toUpperCase() + attribute.substring(1) + " " + type ;
        
        const ingredientNames = ingredients.map(ingredient => ingredient.name);

        return new Venom(name, type, modifier, value, attribute, ingredientNames);
    }

    static createFrenzy(ingredients)
    {
        const numIngredientsOfEachModifier = Venom.getNumIngredientsOfEachModifier(ingredients);
       
        const value = Venom.calculateValue(ingredients);
        const modifier = Venom.getModifier(numIngredientsOfEachModifier);
        

        const type = "venom";
        const attribute = "insanity";
        const effect = "frenzy";

        const name = modifier != "" ?   modifier.substring(0,1).toUpperCase() + modifier.substring(1) + " " + effect + " " + type :
                                        effect.substring(0,1).toUpperCase() + effect.substring(1) + " " + type ;
        
        const ingredientNames = ingredients.map(ingredient => ingredient.name);

        return new Venom(name, type, modifier, value, attribute, ingredientNames);
    }


    static calculateValue(ingredients) {
    
        const values = ingredients.map(ingredient => ingredient.value); 
    
        const totalValue =  values.reduce( (accumulator, currentValue) => 
                accumulator + currentValue, 0);

        const average = totalValue / ingredients.length;

        //Redondeamos resultado a múltiplo de 5 inmediatamente inferior
        const realValue = Math.floor(average / 5) * 5;

        return -realValue;
    }
    
}

module.exports = {
    Venom
}