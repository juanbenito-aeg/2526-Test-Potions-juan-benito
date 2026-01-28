const { Cauldron } = require("../cauldron");
const { Essence } = require("../essence");
const { Potion } = require("../potion");
const {
  PotionType,
  getEssenceValueFrom,
  getEffectTypeFromIngredient,
} = require("../utils");

const ironbarkBerry = {
  _id: "6702b39d76863c206a48cccc",
  name: "Ironbark Berry",
  description: "A hard berry that enhances hit points by a small amount.",
  value: 25,
  effects: ["lesser_increase_hit_points"],
  image: "/images/ingredients/increase/increase_3.webp",
  type: "ingredient",
};

const giantTear = {
  _id: "6702b44f76863c206a48cce8",
  name: "Giant's Tear",
  description:
    "A tear known for its ability to enhance strength and fortitude.",
  value: 250,
  effects: ["greater_restore_strength"],
  image: "/images/ingredients/restore/restore_19.webp",
  type: "ingredient",
};

describe("Cuando los efectos de ingredientes asociados llevarán los nombres: “Increase”", () => {
  describe("Cuando todos los ingredientes tienen el mismo atributo HP", () => {
    const ingredients = [ironbarkBerry, ironbarkBerry];

    const potion = Cauldron.createPotion(ingredients);

    it("El tipo será essence", () => {
      expect(potion.type).toBe(PotionType.ESSENCE);
    });

    describe("Cuando todos los efectos son del mismo tipo (lesser, greater, …)", () => {
      describe("Cuando el número de ingredientes es 2", () => {
        it("El valor resultante del atributo será la suma de values de los ingredientes más un 20%", () => {
          const essenceValue = Essence.calculateValue(
            ingredients,
            Essence.isPotionBoosted(
              Potion.getNumIngredientsOfEachModifier(ingredients),
              ingredients.length,
            ),
          );

          expect(potion.value).toBe(essenceValue);
        });
      });

      describe("Cuando el número de ingredientes es 3", () => {
        it("El valor resultante del atributo será la suma de values de los ingredientes más un 40%", () => {
          ingredients.push(ironbarkBerry);

          const potion = Cauldron.createPotion(ingredients);

          const essenceValue = Essence.calculateValue(
            ingredients,
            Essence.isPotionBoosted(
              Potion.getNumIngredientsOfEachModifier(ingredients),
              ingredients.length,
            ),
          );

          expect(potion.value).toBe(essenceValue);
        });
      });

      describe("Cuando el número de ingredientes es 4", () => {
        it("El valor resultante del atributo será la suma de values de los ingredientes más un 80%", () => {
          ingredients.push(ironbarkBerry);

          const potion = Cauldron.createPotion(ingredients);

          const essenceValue = Essence.calculateValue(
            ingredients,
            Essence.isPotionBoosted(
              Potion.getNumIngredientsOfEachModifier(ingredients),
              ingredients.length,
            ),
          );

          expect(potion.value).toBe(essenceValue);
        });
      });

      it("El nombre de la poción resultante deberá ser: Essence of + modifier + heal. Ej: Essence of lesser heal. Siendo el modificador a aplicar el nombre de la potencia de los ingredientes.", () => {
        const modifier = getEffectTypeFromIngredient(ingredients[0]);

        expect(potion.name).toBe(`Essence of ${modifier} heal`);
      });
    });

    describe("Cuando todos los efectos son de diferente tipo (lesser, greater, …)", () => {
      const ingredients = [
        ironbarkBerry,
        {
          _id: "6702b39d76863c206a48ccca",
          name: "Heartroot",
          description:
            "A rare root known to strengthen the body's vitality permanently.",
          value: 275,
          effects: ["greater_increase_hit_points"],
          image: "/images/ingredients/increase/increase_1.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El valor resultante del atributo será la suma de values de los ingredientes", () => {
        const essenceValue = Essence.calculateValue(
          ingredients,
          Essence.isPotionBoosted(
            Potion.getNumIngredientsOfEachModifier(ingredients),
            ingredients.length,
          ),
        );

        expect(potion.value).toBe(essenceValue);
      });

      it("El nombre de la poción resultante deberá ser: Essence of + modifier + heal. Ej: Essence of lesser heal. El modificador del nombre será el que corresponda con el modificador más pequeño", () => {
        const modifier = Potion.getModifier(
          Potion.getNumIngredientsOfEachModifier(ingredients),
        );

        expect(potion.name).toBe(`Essence of ${modifier} heal`);
      });
    });
  });

  describe("Cuando no todos los ingredientes tienen el mismo atributo (HP)", () => {
    const ingredients = [ironbarkBerry, giantTear];

    const potion = Cauldron.createPotion(ingredients);

    it("No podremos crear el elixir. El tipo de la poción creada no será “essence”.", () => {
      expect(potion.type).not.toBe(PotionType.ESSENCE);
    });
  });
});

describe("Cuando alguno de los efectos de ingredientes no lleva el nombre “Increase”.", () => {
  const ingredients = [ironbarkBerry, giantTear];

  const potion = Cauldron.createPotion(ingredients);

  it("No podremos crear el elixir. El tipo de la poción creada no será “essence”.", () => {
    expect(potion.type).not.toBe(PotionType.ESSENCE);
  });
});
