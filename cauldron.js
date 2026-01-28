const { Essence } = require ('./essence');
const { Stench } = require ('./stench');
const { Elixir } = require ('./elixir');
const { Venom } = require ('./venom');
const { Antidote } = require ('./antidote');
const { Poison } = require ('./poison');
const { TonicOfDownfall } = require ('./tonicOfDownfall');

class Cauldron {


    static createPotion(ingredients)
    {
        //Condición 
        if (ingredients.length < 2 || ingredients.length > 4) {
            //Número de ingredientes incorrecto
            return Cauldron.failed(ingredients);
        }

        const attribute = Cauldron.getAttributeFromIngredients(ingredients);
        const effect    = Cauldron.getEffectFromIngredients(ingredients);
        
        if (attribute === "mixed" || effect === "mixed")
        {
            //Atributos mezclados
            return Cauldron.failed(ingredients);
        }
        
        switch (effect) {
            case "increase":
                if (attribute === "hit_points")
                    return Cauldron.essence(ingredients);
                else
                    return Cauldron.failed(ingredients);
            case "decrease":
                 if (attribute === "hit_points")
                    return Cauldron.stench(ingredients);
                else
                    return Cauldron.failed(ingredients);
            case "boost":
                if (attribute === "hit_points")
                    return Cauldron.failed(ingredients);
                else
                    return Cauldron.elixir(ingredients, attribute);
            case "setback":
                if (attribute === "hit_points")
                    return Cauldron.failed(ingredients);
                else
                    return Cauldron.venom(ingredients, attribute);  
            case "frenzy":
                return Cauldron.venomFrenzy(ingredients);
            case "calm":
                return Cauldron.elixirCalm(ingredients);
            case "restore":
                return Cauldron.antidote(ingredients, attribute);
            case "damage":
                return Cauldron.poison(ingredients, attribute);
            default:
                return Cauldron.failed(ingredients);
            
        }
        
       
        
    }

    static getEffectFromIngredients(ingredients) {
        const effectID = {
            "mixed": -1,
            "increase": 0,
            "decrease": 1,
            "boost": 2,
            "setback": 3,
            "frenzy": 4,
            "calm": 5,
            "restore": 6,
            "damage": 7,
            "total_effects" : 8
        }

        const effectCounter = new Array(effectID.total_effects).fill(0);

        //Contamos los atributos de cada tipo
        ingredients.forEach(ingredient => {
            const effect = Cauldron.getEffectNameFromIngredients(ingredient);
            effectCounter[effectID[effect]]++;
            
        });

        //Vemos si sólo existe un único efecto en los ingredientes
        const indexOfEffect = effectCounter.findIndex(effect => effect === ingredients.length);

        //Obtain attributeID key from indexOFAttribute value
        const effect = Object.keys(effectID).find(key => effectID[key] === indexOfEffect);

        return effect;
    }

    static getAttributeFromIngredients(ingredients) {
        const attributeID = {
            "mixed": -1,
            "hit_points": 0,
            "strength" : 1,
            "intelligence": 2,
            "dexterity": 3,
            "constitution": 4,
            "charisma": 5,
            "insanity": 6,
            "total_attributes" : 7
        }

        //AttributeCounter guarda el número de atributos de cada tipo
        const attributeCounter = new Array(attributeID.total_attributes).fill(0);

        //Contamos los atributos de cada tipo
        ingredients.forEach(ingredient => {
            const effect = Cauldron.getEffectAttributeFromIngredients(ingredient);
            attributeCounter[attributeID[effect]]++;
            
        });

        //Vemos si sólo existe un único atributo en los ingredientes
        const indexOfAttribute = attributeCounter.findIndex(attribute => attribute === ingredients.length);

        //Obtain attributeID key from indexOFAttribute value
        const attribute = Object.keys(attributeID).find(key => attributeID[key] === indexOfAttribute);

        return attribute;
        
    }

    static elixir(ingredients, attribute) {
            return Elixir.create(ingredients, attribute);
    }

    static elixirCalm(ingredients) {
        return Elixir.createCalm(ingredients);
        
    }

    static venomFrenzy(ingredients) {
        return Venom.createFrenzy(ingredients);
        
    }

    static venom(ingredients, attribute) {
        return Venom.create(ingredients, attribute);
    }

    static failed(ingredients) {
        return TonicOfDownfall.create(ingredients)
    }

    static essence(ingredients) {
        return Essence.create(ingredients);
    }

    static stench(ingredients) {
        return Stench.create(ingredients);
    }

    static antidote(ingredients, attribute) {
        return Antidote.create(ingredients, attribute);
    }

    static poison(ingredients, attribute) {
        return Poison.create(ingredients, attribute);
    }

    static getEffectAttributeFromIngredients (ingredient) {
        const effectTokens = ingredient.effects[0].split("_");
        const lastToken = effectTokens[effectTokens.length - 1];
        if (lastToken === "points") 
            return effectTokens[effectTokens.length - 2] + "_" + effectTokens[effectTokens.length - 1];
        else if ((lastToken === "frenzy") || (lastToken === "calm"))
            return "insanity";
        else
            return effectTokens[effectTokens.length - 1];
    }

    static getEffectNameFromIngredients (ingredient) {
        const effectTokens = ingredient.effects[0].split("_");
        const lastToken = effectTokens[effectTokens.length - 1];
        if (lastToken === "points") 
            return effectTokens[effectTokens.length - 3];
        else if ((lastToken === "frenzy") || (lastToken === "calm"))
            return lastToken;
        else
            return effectTokens[effectTokens.length - 2];
    }
}

module.exports = {
    Cauldron
}