const { Cauldron } = require("../cauldron");
const {
  getIngredientEffectAttribute,
  PotionType,
  getAntidoteOrPoisonValue,
} = require("../utils");

describe("Cuando todos los ingredientes llevan el efecto de tipo “Damage”.", () => {
  describe("Cuando todos los ingredientes tienen el mismo atributo (INT, DEX…)", () => {
    const ingredients = [
      {
        _id: "6702b46b76863c206a48ccfb",
        name: "Sickly Sap",
        description: "A viscous sap that slows movement and reduces dexterity.",
        value: 175,
        effects: ["greater_damage_dexterity"],
        image: "/images/ingredients/damage/damage_9.webp",
        type: "ingredient",
      },
      {
        _id: "6702b46b76863c206a48ccf5",
        name: "Tainted Thorn",
        description: "A thorn that inflicts pain and weakens dexterity.",
        value: 5,
        effects: ["least_damage_dexterity"],
        image: "/images/ingredients/damage/damage_3.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("El nombre deberá ser el correspondiente. Poison of + “", () => {
      const ingredientsEffectAttribute = getIngredientEffectAttribute(
        ingredients[0],
      );

      expect(potion.name).toBe(
        `Poison of damage ${ingredientsEffectAttribute}`,
      );
    });

    it("El value será negativo e igual a la suma de los valores según la tabla de modificadores.", () => {
      expect(potion.value).toBeLessThan(0);

      const poisonValue = getAntidoteOrPoisonValue(
        ingredients,
        PotionType.POISON,
      );

      expect(potion.value).toBe(poisonValue);
    });

    it("El tipo será “poison”", () => {
      expect(potion.type).toBe(PotionType.POISON);
    });
  });

  describe("Cuando todos los ingredientes no tienen el mismo atributo (INT, DEX…)", () => {
    const ingredients = [
      {
        _id: "6702b46b76863c206a48ccfb",
        name: "Sickly Sap",
        description: "A viscous sap that slows movement and reduces dexterity.",
        value: 175,
        effects: ["greater_damage_dexterity"],
        image: "/images/ingredients/damage/damage_9.webp",
        type: "ingredient",
      },
      {
        _id: "6702b46b76863c206a48cd0e",
        name: "Defenseless Herb",
        description:
          "A herb that leaves the user vulnerable by reducing constitution.",
        value: 12,
        effects: ["least_damage_constitution"],
        image: "/images/ingredients/damage/damage_28.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("No podremos crear el elixir. El tipo no puede ser “poison”", () => {
      expect(potion.type).not.toBe(PotionType.POISON);
    });
  });
});

describe("Si alguno de los ingredientes no tiene el nombre “Damage”.", () => {
  const ingredients = [
    {
      _id: "6702b44f76863c206a48ccf0",
      name: "Calm Blossom",
      description:
        "A delicate flower that soothes the mind and restores sanity.",
      value: 6,
      effects: ["restore_insanity"],
      image: "/images/ingredients/restore/restore_27.webp",
      type: "ingredient",
    },
    {
      _id: "6702b46b76863c206a48ccfb",
      name: "Sickly Sap",
      description: "A viscous sap that slows movement and reduces dexterity.",
      value: 175,
      effects: ["greater_damage_dexterity"],
      image: "/images/ingredients/damage/damage_9.webp",
      type: "ingredient",
    },
  ];

  const potion = Cauldron.createPotion(ingredients);

  it("No podremos crear un poison. El tipo no puede ser “poison”", () => {
    expect(potion.type).not.toBe(PotionType.POISON);
  });
});
