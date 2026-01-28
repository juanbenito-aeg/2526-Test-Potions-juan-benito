
const { Potion } = require("./potion");


class Elixir extends Potion{

    constructor(name, type, modifier, value, attribute, ingredients){
        super(name, type, modifier, value, attribute, ingredients);
    }


    static create(ingredients, attribute)
    {
        const numIngredientsOfEachModifier = Elixir.getNumIngredientsOfEachModifier(ingredients);
       
        const value = Elixir.calculateValue(ingredients);
        const modifier = Elixir.getModifier(numIngredientsOfEachModifier);
        

        const type = "elixir";

        const name = modifier != "" ?   modifier.substring(0,1).toUpperCase() + modifier.substring(1) + " " + attribute + " " + type :
                                        attribute.substring(0,1).toUpperCase() + attribute.substring(1) + " " + type ;
        
        const ingredientNames = ingredients.map(ingredient => ingredient.name);

        return new Elixir(name, type, modifier, value, attribute, ingredientNames);
    }

    static createCalm(ingredients)
    {
        const numIngredientsOfEachModifier = Elixir.getNumIngredientsOfEachModifier(ingredients);
       
        const value = Elixir.calculateValue(ingredients);
        const modifier = Elixir.getModifier(numIngredientsOfEachModifier);
        

        const type = "elixir";
        const attribute = "insanity";
        const effect = "calm";

        const name = modifier != "" ?   modifier.substring(0,1).toUpperCase() + modifier.substring(1) + " " + effect + " " + type :
                                        effect.substring(0,1).toUpperCase() + effect.substring(1) + " " + type ;
        
        const ingredientNames = ingredients.map(ingredient => ingredient.name);

        return new Elixir(name, type, modifier, value, attribute, ingredientNames);
    }




    static calculateValue(ingredients) {
    
        const values = ingredients.map(ingredient => ingredient.value); 
    
        const totalValue =  values.reduce( (accumulator, currentValue) => 
                accumulator + currentValue, 0);

        const average = totalValue / ingredients.length;

        //Redondeamos resultado a múltiplo de 5 inmediatamente inferior
        const realValue = Math.floor(average / 5) * 5;

        return realValue;
    }
    
}

module.exports = {
    Elixir
}