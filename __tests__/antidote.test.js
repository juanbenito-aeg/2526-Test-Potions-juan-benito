const { Cauldron } = require("../cauldron");
const {
  getEffectTypeFromIngredient,
  Modifier,
  getIngredientEffectAttribute,
  PotionType,
} = require("../utils");

describe("Cuando todos los ingredientes llevan el efecto de tipo “Restore”.", () => {
  describe("Cuando todos los ingredientes tienen el mismo atributo (INT, DEX…)", () => {
    const ingredients = [
      {
        _id: "6702b44f76863c206a48cce8",
        name: "Giant's Tear",
        description:
          "A tear known for its ability to enhance strength and fortitude.",
        value: 250,
        effects: ["greater_restore_strength"],
        image: "/images/ingredients/restore/restore_19.webp",
        type: "ingredient",
      },
      {
        _id: "6702b44f76863c206a48ccdc",
        name: "Titan's Blood",
        description:
          "A rare blood known for its ability to enhance strength tremendously.",
        value: 75,
        effects: ["restore_strength"],
        image: "/images/ingredients/restore/restore_7.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("El nombre deberá ser el correspondiente. Antidote of + “", () => {
      const ingredientsEffectAttribute = getIngredientEffectAttribute(
        ingredients[0],
      );

      expect(potion.name).toBe(
        `Antidote of restore ${ingredientsEffectAttribute}`,
      );
    });

    it("El value será positivo e igual a la suma de los valores según la tabla de modificadores.", () => {
      expect(potion.value).toBeGreaterThan(0);

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

      const potionValue = values.reduce(
        (currentPotionValue, value) => currentPotionValue + value,
        0,
      );

      expect(potion.value).toBe(potionValue);
    });

    it("El tipo será “antidote”", () => {
      expect(potion.type).toBe(PotionType.ANTIDOTE);
    });
  });

  describe("Cuando todos los ingredientes no tienen el mismo atributo (INT, DEX…)", () => {
    const ingredients = [
      {
        _id: "6702b44f76863c206a48cce8",
        name: "Giant's Tear",
        description:
          "A tear known for its ability to enhance strength and fortitude.",
        value: 250,
        effects: ["greater_restore_strength"],
        image: "/images/ingredients/restore/restore_19.webp",
        type: "ingredient",
      },
      {
        _id: "6702b44f76863c206a48cce1",
        name: "Tranquility Flower",
        description:
          "A tranquil flower that helps to alleviate insanity and calm the mind.",
        value: 5,
        effects: ["least_restore_insanity"],
        image: "/images/ingredients/restore/restore_12.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("No podremos crear el elixir. El tipo no puede ser “antidote”", () => {
      expect(potion.type).not.toBe(PotionType.ANTIDOTE);
    });
  });
});

describe("Si alguno de los ingredientes no tiene el nombre “Restore”.", () => {
  const ingredients = [
    {
      _id: "6702b3b776863c206a48ccd1",
      name: "Bloodthorn Berry",
      description:
        "A poisonous berry that slightly decreases one's overall health.",
      value: 35,
      effects: ["lesser_decrease_hit_points"],
      image: "/images/ingredients/decrease/decrease_3.webp",
      type: "ingredient",
    },
    {
      _id: "6702b44f76863c206a48cce8",
      name: "Giant's Tear",
      description:
        "A tear known for its ability to enhance strength and fortitude.",
      value: 250,
      effects: ["greater_restore_strength"],
      image: "/images/ingredients/restore/restore_19.webp",
      type: "ingredient",
    },
  ];

  const potion = Cauldron.createPotion(ingredients);

  it("No podremos crear un antídoto. El tipo no puede ser “antidote”", () => {
    expect(potion.type).not.toBe(PotionType.ANTIDOTE);
  });
});
