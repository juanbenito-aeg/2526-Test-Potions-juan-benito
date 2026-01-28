


const Modifier = {
    LEAST: "least",
    LESSER: "lesser",
    NORMAL: "",
    GREATER: "greater"
    
}

const ModifierID = {
    LEAST: 0,
    LESSER: 1,
    NORMAL: 2,
    GREATER: 3
}

const Attributes = [
    "strength",
    "hit_points",
    "intelligence",
    "dexterity",
    "constitution",
    "charisma"
]



const getEffectTypeFromIngredient = (ingredient) => {
    return ingredient.effects[0].substring(0, ingredient.effects[0].indexOf("_"));
}

const getEssenceValueFrom = (ingredients) => {

    if (ingredients.length < 2 || ingredients.length > 4) {
        return -1;
    }
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

    const numNormalIngredients = ingredients.length - numGreaterIngredients - numLeastIngredients - numLesserIngredients;

    
    const globalModifier = (numLeastIngredients > 0 ? Modifier.LEAST : 
                            numLesserIngredients > 0 ? Modifier.LESSER : 
                            numNormalIngredients > 0 ? Modifier.NORMAL : 
                            Modifier.GREATER
                            

    );

    const isPotionBoosted = numLesserIngredients === ingredients.length ||
                            numLeastIngredients  === ingredients.length ||
                            numLesserIngredients === ingredients.length ||
                            numNormalIngredients === ingredients.length;

    const values = ingredients.map(ingredient => ingredient.value); 

    const totalValue =  values.reduce( (accumulator, currentValue) => 
            accumulator, currentValue, 0);

    if (isPotionBoosted)
    {
        //Todos los ingredientes son del mismo tipo
        return Math.ceil(totalValue * (ingredients.length - 2 + 1) * 2 + 1);
            
          
    }
    else {
        //Los ingredientes son de distinto tipo
        return totalValue;

    }
}

module.exports = { 
    getEssenceValueFrom,
    Attributes,
    ModifierID,
    Modifier,
    getEffectTypeFromIngredient

}