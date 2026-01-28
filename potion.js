
const { ModifierID, Modifier, getEffectTypeFromIngredient } = require("./utils");

class Potion {

    constructor(name, type, modifier, value, attribute, ingredients)
    {
        this.name = name;
        this.type = type;
        this.modifier = modifier;
        this.value =  value;
        this.attribute = attribute;
        this.ingredients = ingredients;
    }

    static getModifier(numIngredientsOfEachModifier) {
        return (numIngredientsOfEachModifier[0] > 0 ? Modifier.LEAST : 
                numIngredientsOfEachModifier[1] > 0 ? Modifier.LESSER : 
                numIngredientsOfEachModifier[2] > 0 ? Modifier.NORMAL : 
                Modifier.GREATER
                );
    }


    static getNumIngredientsOfEachModifier(ingredients) {
        
        //Ya está verificado que todos los atributos sean del tipo Increase
        const numLesserIngredients = ingredients.filter(ingredient => {
            return getEffectTypeFromIngredient(ingredient) === "lesser";
        }).length;
    
        const numLeastIngredients = ingredients.filter(ingredient => {
            return getEffectTypeFromIngredient(ingredient) === "least";
        }).length;
    
        const numGreaterIngredients = ingredients.filter(ingredient => {
            return getEffectTypeFromIngredient(ingredient) === "greater";
        }).length;
    
        //TODO: No consideramos el caso de que un ingrediente tenga modificador incorrecto
        const numNormalIngredients = ingredients.length - numGreaterIngredients - numLeastIngredients - numLesserIngredients;
    
        const numIngredients = [];
        numIngredients[ModifierID.LEAST]    = numLeastIngredients;
        numIngredients[ModifierID.LESSER]   = numLesserIngredients;
        numIngredients[ModifierID.NORMAL]   = numNormalIngredients;
        numIngredients[ModifierID.GREATER]  = numGreaterIngredients;

        return numIngredients;
        
    }

}

module.exports = {
    Potion
}