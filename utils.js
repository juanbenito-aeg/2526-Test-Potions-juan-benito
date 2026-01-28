const Modifier = {
  LEAST: "least",
  LESSER: "lesser",
  NORMAL: "",
  GREATER: "greater",
};

const ModifierID = {
  LEAST: 0,
  LESSER: 1,
  NORMAL: 2,
  GREATER: 3,
};

const Attributes = [
  "strength",
  "hit_points",
  "intelligence",
  "dexterity",
  "constitution",
  "charisma",
];

const PotionType = {
  ANTIDOTE: "antidote",
  POISON: "poison",
  ELIXIR: "elixir",
  VENOM: "venom",
  ESSENCE: "essence",
  STENCH: "stench",
};

const getEffectTypeFromIngredient = (ingredient) => {
  return ingredient.effects[0].substring(0, ingredient.effects[0].indexOf("_"));
};

const getEssenceValueFrom = (ingredients) => {
  if (ingredients.length < 2 || ingredients.length > 4) {
    return -1;
  }
  //Ya está verificado que todos los atributos sean del tipo Increase
  const numLesserIngredients = ingredients.filter((ingredient) => {
    return getEffectTypeFromIngredient(ingredient) === "lesser";
  }).length;

  const numLeastIngredients = ingredients.filter((ingredient) => {
    return getEffectTypeFromIngredient(ingredient) === "least";
  }).length;

  const numGreaterIngredients = ingredients.filter((ingredient) => {
    return getEffectTypeFromIngredient(ingredient) === "greater";
  }).length;

  const numNormalIngredients =
    ingredients.length -
    numGreaterIngredients -
    numLeastIngredients -
    numLesserIngredients;

  const globalModifier =
    numLeastIngredients > 0
      ? Modifier.LEAST
      : numLesserIngredients > 0
        ? Modifier.LESSER
        : numNormalIngredients > 0
          ? Modifier.NORMAL
          : Modifier.GREATER;

  const isPotionBoosted =
    numLesserIngredients === ingredients.length ||
    numLeastIngredients === ingredients.length ||
    numLesserIngredients === ingredients.length ||
    numNormalIngredients === ingredients.length;

  const values = ingredients.map((ingredient) => ingredient.value);

  const totalValue = values.reduce(
    (accumulator, currentValue) => accumulator,
    currentValue,
    0,
  );

  if (isPotionBoosted) {
    //Todos los ingredientes son del mismo tipo
    return Math.ceil(totalValue * (ingredients.length - 2 + 1) * 2 + 1);
  } else {
    //Los ingredientes son de distinto tipo
    return totalValue;
  }
};

const getIngredientEffectAttribute = (ingredient) => {
  let ingredientEffectAttribute;

  Attributes.forEach((attribute) => {
    if (ingredient.effects[0].includes(attribute)) {
      ingredientEffectAttribute = attribute;
    }
  });

  return ingredientEffectAttribute;
};

const getAntidoteOrPoisonValue = (ingredients, isPoison) => {
  const values = ingredients.map((ingredient) => {
    const effectType = getEffectTypeFromIngredient(ingredient);

    let value;

    switch (effectType) {
      case Modifier.LEAST: {
        value = 1;
        break;
      }

      case Modifier.LESSER: {
        value = 2;
        break;
      }

      case Modifier.GREATER: {
        value = 4;
        break;
      }

      default: {
        value = 3;
        break;
      }
    }

    return value;
  });

  let potionValue = values.reduce(
    (currentPotionValue, value) => currentPotionValue + value,
    0,
  );

  if (isPoison) {
    potionValue = -potionValue;
  }

  return potionValue;
};

module.exports = {
  getEssenceValueFrom,
  Attributes,
  ModifierID,
  Modifier,
  PotionType,
  getEffectTypeFromIngredient,
  getIngredientEffectAttribute,
  getAntidoteOrPoisonValue,
};
