const { Cauldron } = require("../cauldron");
const { Essence } = require("../essence");
const { Potion } = require("../potion");
const { Stench } = require("../stench");
const { PotionType, getEffectTypeFromIngredient } = require("../utils");

const bloodthornBerry = {
  _id: "6702b3b776863c206a48ccd1",
  name: "Bloodthorn Berry",
  description:
    "A poisonous berry that slightly decreases one's overall health.",
  value: 35,
  effects: ["lesser_decrease_hit_points"],
  image: "/images/ingredients/decrease/decrease_3.webp",
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

describe("Cuando los efectos de ingredientes asociados llevarán los nombres: “Decrease”", () => {
  describe("Cuando todos los ingredientes tienen el mismo atributo HP", () => {
    const ingredients = [bloodthornBerry, bloodthornBerry];

    const potion = Cauldron.createPotion(ingredients);

    it("El tipo será stentch", () => {
      expect(potion.type).toBe(PotionType.STENCH);
    });

    describe("Cuando todos los efectos son del mismo tipo (lesser, greater, …)", () => {
      describe("Cuando el número de ingredientes es 2", () => {
        it("El valor resultante del atributo será la suma de values de los ingredientes más un 20%", () => {
          const stenchValue = Stench.calculateValue(
            ingredients,
            Stench.isPotionBoosted(
              Potion.getNumIngredientsOfEachModifier(ingredients),
              ingredients.length,
            ),
          );

          expect(potion.value).toBe(stenchValue);
        });
      });

      describe("Cuando el número de ingredientes es 3", () => {
        it("El valor resultante del atributo será la suma de values de los ingredientes más un 40%", () => {
          ingredients.push(bloodthornBerry);

          const potion = Cauldron.createPotion(ingredients);

          const stenchValue = Stench.calculateValue(
            ingredients,
            Stench.isPotionBoosted(
              Potion.getNumIngredientsOfEachModifier(ingredients),
              ingredients.length,
            ),
          );

          expect(potion.value).toBe(stenchValue);
        });
      });

      describe("Cuando el número de ingredientes es 4", () => {
        it("El valor resultante del atributo será la suma de values de los ingredientes más un 80%", () => {
          ingredients.push(bloodthornBerry);

          const potion = Cauldron.createPotion(ingredients);

          const stenchValue = Stench.calculateValue(
            ingredients,
            Stench.isPotionBoosted(
              Potion.getNumIngredientsOfEachModifier(ingredients),
              ingredients.length,
            ),
          );

          expect(potion.value).toBe(stenchValue);
        });
      });

      it("El nombre de la poción resultante deberá ser: Stench of + modifier + damage. Ej: Stench of lesser damage. Siendo el modificador a aplicar el nombre de la potencia de los ingredientes.", () => {
        const modifier = getEffectTypeFromIngredient(ingredients[0]);

        expect(potion.name).toBe(`Stench of ${modifier} damage`);
      });
    });

    describe("Cuando todos los efectos son de diferente tipo (lesser, greater, …)", () => {
      const ingredients = [
        bloodthornBerry,
        {
          _id: "6702b3b776863c206a48cccf",
          name: "Witherleaf",
          description:
            "A cursed leaf that permanently saps the life force of anyone who consumes it.",
          value: 260,
          effects: ["greater_decrease_hit_points"],
          image: "/images/ingredients/decrease/decrease_1.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El valor resultante del atributo será la suma de values de los ingredientes", () => {
        const stenchValue = Stench.calculateValue(
          ingredients,
          Stench.isPotionBoosted(
            Potion.getNumIngredientsOfEachModifier(ingredients),
            ingredients.length,
          ),
        );

        expect(potion.value).toBe(stenchValue);
      });

      it("El nombre de la poción resultante deberá ser: Stench of + modifier + damage. Ej: Stench of lesser damage. El modificador del nombre será el que corresponda con el modificador más pequeño", () => {
        const modifier = Potion.getModifier(
          Potion.getNumIngredientsOfEachModifier(ingredients),
        );

        expect(potion.name).toBe(`Stench of ${modifier} damage`);
      });
    });
  });

  describe("Cuando no todos los ingredientes tienen el mismo atributo (HP)", () => {
    const ingredients = [bloodthornBerry, giantTear];

    const potion = Cauldron.createPotion(ingredients);

    it("No podremos crear el elixir. El tipo de la poción creada no será “stench”.", () => {
      expect(potion.type).not.toBe(PotionType.STENCH);
    });
  });
});

describe("Cuando alguno de los efectos de ingredientes no lleva el nombre “Increase”.", () => {
  const ingredients = [bloodthornBerry, giantTear];

  const potion = Cauldron.createPotion(ingredients);

  it("No podremos crear el elixir. El tipo de la poción creada no será “stench”.", () => {
    expect(potion.type).not.toBe(PotionType.STENCH);
  });
});
