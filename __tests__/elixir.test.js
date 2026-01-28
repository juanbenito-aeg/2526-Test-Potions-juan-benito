const { Cauldron } = require("../cauldron");
const { Elixir } = require("../elixir");
const { Potion } = require("../potion");
const { PotionType } = require("../utils");

describe("Cuando los efectos de ingredientes asociados llevarán los nombres: “Boost”", () => {
  describe("Cuando todos los ingredientes tienen el mismo atributo (INT, DEX…)", () => {
    const ingredients = [
      {
        _id: "6702b4f876863c206a48cd1a",
        name: "Dwarven Pepper",
        description: "A spicy pepper that boosts constitution and endurance.",
        value: 55,
        effects: ["boost_constitution"],
        image: "/images/ingredients/boost/boost_7.webp",
        type: "ingredient",
      },
      {
        _id: "6702b4f876863c206a48cd1f",
        name: "Willow Spark",
        description: "A crackling herb that boosts constitution.",
        value: 45,
        effects: ["boost_constitution"],
        image: "/images/ingredients/boost/boost_12.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("El valor resultante del atributo será la media de los values de los ingredientes. Una vez calculada la media se redondeará al múltiplo de 5 inmediatamente inferior.", () => {
      const elixirValue = Elixir.calculateValue(ingredients);

      expect(potion.value).toBe(elixirValue);
    });

    it("El tipo será elixir", () => {
      expect(potion.type).toBe(PotionType.ELIXIR);
    });

    describe("Cuando todos los efectos son de tipo least", () => {
      const ingredients = [
        {
          _id: "6702b4f876863c206a48cd20",
          name: "Radiant Petal",
          description: "A petal that enhances charisma with its ethereal glow.",
          value: 9,
          effects: ["least_boost_charisma"],
          image: "/images/ingredients/boost/boost_13.webp",
          type: "ingredient",
        },
        {
          _id: "6702b4f876863c206a48cd20",
          name: "Radiant Petal",
          description: "A petal that enhances charisma with its ethereal glow.",
          value: 9,
          effects: ["least_boost_charisma"],
          image: "/images/ingredients/boost/boost_13.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Least + Attribute + elixir", () => {
        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        expect(potion.name).toBe(`Least ${attribute} elixir`);
      });
    });

    describe("Cuando todos los efectos son de tipo lesser", () => {
      const ingredients = [
        {
          _id: "6702b4f876863c206a48cd1c",
          name: "Frostmoss",
          description: "A cold moss that increases agility and dexterity.",
          value: 35,
          effects: ["lesser_boost_dexterity"],
          image: "/images/ingredients/boost/boost_9.webp",
          type: "ingredient",
        },
        {
          _id: "6702b4f876863c206a48cd1c",
          name: "Frostmoss",
          description: "A cold moss that increases agility and dexterity.",
          value: 35,
          effects: ["lesser_boost_dexterity"],
          image: "/images/ingredients/boost/boost_9.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Lesser + Attribute + elixir", () => {
        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        expect(potion.name).toBe(`Lesser ${attribute} elixir`);
      });
    });

    describe("Cuando todos los efectos son de tipo normal", () => {
      const willowSpark = {
        _id: "6702b4f876863c206a48cd1f",
        name: "Willow Spark",
        description: "A crackling herb that boosts constitution.",
        value: 45,
        effects: ["boost_constitution"],
        image: "/images/ingredients/boost/boost_12.webp",
        type: "ingredient",
      };

      const ingredients = [willowSpark, willowSpark];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Attribute + elixir", () => {
        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        const capitalizedAttribute =
          attribute[0].toUpperCase() + attribute.substring(1);

        expect(potion.name).toBe(`${capitalizedAttribute} elixir`);
      });
    });

    describe("Cuando todos los efectos son de tipo greater", () => {
      const ingredients = [
        {
          _id: "6702b4f876863c206a48cd27",
          name: "Lion's Mane Fern",
          description: "A fern that grants greater agility and dexterity.",
          value: 165,
          effects: ["greater_boost_dexterity"],
          image: "/images/ingredients/boost/boost_20.webp",
          type: "ingredient",
        },
        {
          _id: "6702b4f876863c206a48cd27",
          name: "Lion's Mane Fern",
          description: "A fern that grants greater agility and dexterity.",
          value: 165,
          effects: ["greater_boost_dexterity"],
          image: "/images/ingredients/boost/boost_20.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Greater + Attribute + elixir", () => {
        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        expect(potion.name).toBe(`Greater ${attribute} elixir`);
      });
    });

    describe("Cuando todos los efectos son de tipo diferente", () => {
      const ingredients = [
        {
          _id: "6702b4f876863c206a48cd27",
          name: "Lion's Mane Fern",
          description: "A fern that grants greater agility and dexterity.",
          value: 165,
          effects: ["greater_boost_dexterity"],
          image: "/images/ingredients/boost/boost_20.webp",
          type: "ingredient",
        },
        {
          _id: "6702b4f876863c206a48cd1c",
          name: "Frostmoss",
          description: "A cold moss that increases agility and dexterity.",
          value: 35,
          effects: ["lesser_boost_dexterity"],
          image: "/images/ingredients/boost/boost_9.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Modifier + Attribute + elixir. El modificador del nombre será el que corresponda con el modificador de ingrediente más pequeño.", () => {
        const modifier = Potion.getModifier(
          Potion.getNumIngredientsOfEachModifier(ingredients),
        );
        const capitalizedModifier =
          modifier[0].toUpperCase() + modifier.substring(1);

        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        expect(potion.name).toBe(`${capitalizedModifier} ${attribute} elixir`);
      });
    });
  });

  describe("Cuando no todos los ingredientes tienen el mismo atributo (INT, DEX…)", () => {
    const ingredients = [
      {
        _id: "6702b4f876863c206a48cd1a",
        name: "Dwarven Pepper",
        description: "A spicy pepper that boosts constitution and endurance.",
        value: 55,
        effects: ["boost_constitution"],
        image: "/images/ingredients/boost/boost_7.webp",
        type: "ingredient",
      },
      {
        _id: "6702b4f876863c206a48cd14",
        name: "Dragonroot",
        description: "A rare root that grants immense strength when consumed.",
        value: 275,
        effects: ["greater_boost_strength"],
        image: "/images/ingredients/boost/boost_1.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("No podremos crear el elixir. El tipo de la poción creada no será “elixir”", () => {
      expect(potion.type).not.toBe(PotionType.ELIXIR);
    });
  });
});

describe("Cuando los efectos de ingredientes asociados llevarán los nombres: “Calm", () => {
  describe("Cuando todos los ingredientes tienen el mismo atributo (INS)", () => {
    const ingredients = [
      {
        _id: "6702b56a76863c206a48cd44",
        name: "Tranquil Leaf",
        description:
          "A calming leaf that restores clarity and reduces madness.",
        value: 78,
        effects: ["calm"],
        image: "/images/ingredients/calm/calm_2.webp",
        type: "ingredient",
      },
      {
        _id: "6702b56a76863c206a48cd46",
        name: "Quieting Root",
        description:
          "A root that brings about a gentle peace of mind with every consumption.",
        value: 6,
        effects: ["least_calm"],
        image: "/images/ingredients/calm/calm_4.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("El valor resultante del atributo será la media de los values de los ingredientes. Una vez calculada la media se redondeará al múltiplo de 5 inmediatamente inferior.", () => {
      const elixirValue = Elixir.calculateValue(ingredients);

      expect(potion.value).toBe(elixirValue);
    });

    it("El tipo será elixir", () => {
      expect(potion.type).toBe(PotionType.ELIXIR);
    });

    describe("Cuando todos los efectos son de tipo least", () => {
      const ingredients = [
        {
          _id: "6702b56a76863c206a48cd46",
          name: "Quieting Root",
          description:
            "A root that brings about a gentle peace of mind with every consumption.",
          value: 6,
          effects: ["least_calm"],
          image: "/images/ingredients/calm/calm_4.webp",
          type: "ingredient",
        },
        {
          _id: "6702b56a76863c206a48cd46",
          name: "Quieting Root",
          description:
            "A root that brings about a gentle peace of mind with every consumption.",
          value: 6,
          effects: ["least_calm"],
          image: "/images/ingredients/calm/calm_4.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Least + calm + elixir", () => {
        expect(potion.name).toBe(`Least calm elixir`);
      });
    });

    describe("Cuando todos los efectos son de tipo lesser", () => {
      const ingredients = [
        {
          _id: "6702b56a76863c206a48cd45",
          name: "Peaceful Herb",
          description:
            "An herb known for its ability to alleviate stress and minor insanity.",
          value: 32,
          effects: ["lesser_calm"],
          image: "/images/ingredients/calm/calm_3.webp",
          type: "ingredient",
        },
        {
          _id: "6702b56a76863c206a48cd45",
          name: "Peaceful Herb",
          description:
            "An herb known for its ability to alleviate stress and minor insanity.",
          value: 32,
          effects: ["lesser_calm"],
          image: "/images/ingredients/calm/calm_3.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Lesser + calm + elixir", () => {
        expect(potion.name).toBe(`Lesser calm elixir`);
      });
    });

    describe("Cuando todos los efectos son de tipo normal", () => {
      const ingredients = [
        {
          _id: "6702b56a76863c206a48cd44",
          name: "Tranquil Leaf",
          description:
            "A calming leaf that restores clarity and reduces madness.",
          value: 78,
          effects: ["calm"],
          image: "/images/ingredients/calm/calm_2.webp",
          type: "ingredient",
        },
        {
          _id: "6702b56a76863c206a48cd44",
          name: "Tranquil Leaf",
          description:
            "A calming leaf that restores clarity and reduces madness.",
          value: 78,
          effects: ["calm"],
          image: "/images/ingredients/calm/calm_2.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Calm + elixir", () => {
        expect(potion.name).toBe(`Calm elixir`);
      });
    });

    describe("Cuando todos los efectos son de tipo greater", () => {
      const ingredients = [
        {
          _id: "6702b56a76863c206a48cd43",
          name: "Serenity Blossom",
          description:
            "A rare flower that soothes the mind and banishes feelings of insanity.",
          value: 250,
          effects: ["greater_calm"],
          image: "/images/ingredients/calm/calm_1.webp",
          type: "ingredient",
        },
        {
          _id: "6702b56a76863c206a48cd43",
          name: "Serenity Blossom",
          description:
            "A rare flower that soothes the mind and banishes feelings of insanity.",
          value: 250,
          effects: ["greater_calm"],
          image: "/images/ingredients/calm/calm_1.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Greater + calm + elixir", () => {
        expect(potion.name).toBe(`Greater calm elixir`);
      });
    });

    describe("Cuando todos los efectos son de tipo diferente", () => {
      const ingredients = [
        {
          _id: "6702b56a76863c206a48cd46",
          name: "Quieting Root",
          description:
            "A root that brings about a gentle peace of mind with every consumption.",
          value: 6,
          effects: ["least_calm"],
          image: "/images/ingredients/calm/calm_4.webp",
          type: "ingredient",
        },
        {
          _id: "6702b56a76863c206a48cd43",
          name: "Serenity Blossom",
          description:
            "A rare flower that soothes the mind and banishes feelings of insanity.",
          value: 250,
          effects: ["greater_calm"],
          image: "/images/ingredients/calm/calm_1.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Modifier + calm + elixir. El modificador del nombre será el que corresponda con el modificador de ingrediente más pequeño.", () => {
        const modifier = Potion.getModifier(
          Potion.getNumIngredientsOfEachModifier(ingredients),
        );
        const capitalizedModifier =
          modifier[0].toUpperCase() + modifier.substring(1);

        expect(potion.name).toBe(`${capitalizedModifier} calm elixir`);
      });
    });
  });
});

describe("Cuando alguno de los efectos de ingredientes no lleva el nombre “Calm” o “Boost”", () => {
  const ingredients = [
    {
      _id: "6702b56a76863c206a48cd43",
      name: "Serenity Blossom",
      description:
        "A rare flower that soothes the mind and banishes feelings of insanity.",
      value: 250,
      effects: ["greater_calm"],
      image: "/images/ingredients/calm/calm_1.webp",
      type: "ingredient",
    },
    {
      _id: "6702b53d76863c206a48cd41",
      name: "Lunatic's Thorn",
      description:
        "A thorny herb that induces a subtle but lasting sense of insanity.",
      value: 7,
      effects: ["least_frenzy"],
      image: "/images/ingredients/frenzy/frenzy_4.webp",
      type: "ingredient",
    },
  ];

  const potion = Cauldron.createPotion(ingredients);

  it("No podremos crear el elixir. El tipo de la poción creada no será “elixir”", () => {
    expect(potion.type).not.toBe(PotionType.ELIXIR);
  });
});
