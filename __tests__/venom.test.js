const { Cauldron } = require("../cauldron");
const { Venom } = require("../venom");
const { Potion } = require("../potion");
const { PotionType, capitalize } = require("../utils");

describe("Cuando los efectos de ingredientes asociados llevarán los nombres: “Setback", () => {
  describe("Cuando todos los ingredientes tienen el mismo atributo (INT, DEX…)", () => {
    const ingredients = [
      {
        _id: "6702b51d76863c206a48cd3b",
        name: "Voidleaf",
        description: "A leaf that weakens intelligence upon touch.",
        value: 5,
        effects: ["least_setback_intelligence"],
        image: "/images/ingredients/setback/setback_19.webp",
        type: "ingredient",
      },
      {
        _id: "6702b51d76863c206a48cd2f",
        name: "Sorrow Bloom",
        description: "A melancholic bloom that dulls intelligence.",
        value: 8,
        effects: ["least_setback_intelligence"],
        image: "/images/ingredients/setback/setback_7.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("El valor resultante del atributo será la media de los values de los ingredientes. Una vez calculada la media se redondeará al múltiplo de 5 inmediatamente inferior.", () => {
      const venomValue = Venom.calculateValue(ingredients);

      expect(potion.value).toBe(venomValue);
    });

    it("El tipo será venom", () => {
      expect(potion.type).toBe(PotionType.VENOM);
    });

    describe("Cuando todos los efectos son de tipo least", () => {
      it("El nombre de la poción será: Least + Attribute + venom", () => {
        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        expect(potion.name).toBe(`Least ${attribute} venom`);
      });
    });

    describe("Cuando todos los efectos son de tipo lesser", () => {
      const ingredients = [
        {
          _id: "6702b51d76863c206a48cd31",
          name: "Whisper Grass",
          description: "A soft grass that lowers charisma under its spell.",
          value: 30,
          effects: ["lesser_setback_charisma"],
          image: "/images/ingredients/setback/setback_9.webp",
          type: "ingredient",
        },
        {
          _id: "6702b51d76863c206a48cd31",
          name: "Whisper Grass",
          description: "A soft grass that lowers charisma under its spell.",
          value: 30,
          effects: ["lesser_setback_charisma"],
          image: "/images/ingredients/setback/setback_9.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Lesser + Attribute + venom", () => {
        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        expect(potion.name).toBe(`Lesser ${attribute} venom`);
      });
    });

    describe("Cuando todos los efectos son de tipo normal", () => {
      const ingredients = [
        {
          _id: "6702b51d76863c206a48cd39",
          name: "Cloudcap Mushroom",
          description: "A rare mushroom that reduces dexterity.",
          value: 72,
          effects: ["setback_dexterity"],
          image: "/images/ingredients/setback/setback_17.webp",
          type: "ingredient",
        },
        {
          _id: "6702b51d76863c206a48cd39",
          name: "Cloudcap Mushroom",
          description: "A rare mushroom that reduces dexterity.",
          value: 72,
          effects: ["setback_dexterity"],
          image: "/images/ingredients/setback/setback_17.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Attribute + venom", () => {
        const attribute = capitalize(
          Cauldron.getEffectAttributeFromIngredients(ingredients[0]),
        );

        expect(potion.name).toBe(`${attribute} venom`);
      });
    });

    describe("Cuando todos los efectos son de tipo greater", () => {
      const ingredients = [
        {
          _id: "6702b51d76863c206a48cd30",
          name: "Twilight Thorn",
          description: "A thorn that saps constitution when pricked.",
          value: 210,
          effects: ["greater_setback_constitution"],
          image: "/images/ingredients/setback/setback_8.webp",
          type: "ingredient",
        },
        {
          _id: "6702b51d76863c206a48cd30",
          name: "Twilight Thorn",
          description: "A thorn that saps constitution when pricked.",
          value: 210,
          effects: ["greater_setback_constitution"],
          image: "/images/ingredients/setback/setback_8.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Greater + Attribute + venom", () => {
        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        expect(potion.name).toBe(`Greater ${attribute} venom`);
      });
    });

    describe("Cuando todos los efectos son de tipo diferente", () => {
      const ingredients = [
        {
          _id: "6702b51d76863c206a48cd2d",
          name: "Spider Silk",
          description: "A thin, sticky silk that reduces dexterity.",
          value: 29,
          effects: ["lesser_setback_dexterity"],
          image: "/images/ingredients/setback/setback_5.webp",
          type: "ingredient",
        },
        {
          _id: "6702b51d76863c206a48cd33",
          name: "Frostvine",
          description: "A vine that numbs the body and reduces dexterity.",
          value: 17,
          effects: ["least_setback_dexterity"],
          image: "/images/ingredients/setback/setback_11.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Modifier + Attribute + venom. El modificador del nombre será el que corresponda con el modificador de ingrediente más pequeño.", () => {
        const modifier = capitalize(
          Potion.getModifier(
            Potion.getNumIngredientsOfEachModifier(ingredients),
          ),
        );

        const attribute = Cauldron.getEffectAttributeFromIngredients(
          ingredients[0],
        );

        expect(potion.name).toBe(`${modifier} ${attribute} venom`);
      });
    });
  });

  describe("Cuando no todos los ingredientes tienen el mismo atributo (INT, DEX…)", () => {
    const ingredients = [
      {
        _id: "6702b51d76863c206a48cd33",
        name: "Frostvine",
        description: "A vine that numbs the body and reduces dexterity.",
        value: 17,
        effects: ["least_setback_dexterity"],
        image: "/images/ingredients/setback/setback_11.webp",
        type: "ingredient",
      },
      {
        _id: "6702b51d76863c206a48cd36",
        name: "Dewberry",
        description: "A berry that dims the mind, lowering intelligence.",
        value: 38,
        effects: ["lesser_setback_intelligence"],
        image: "/images/ingredients/setback/setback_14.webp",
        type: "ingredient",
      },
    ];

    const potion = Cauldron.createPotion(ingredients);

    it("No podremos crear el venom. El tipo de la poción creada no será “venom”", () => {
      expect(potion.type).not.toBe(PotionType.VENOM);
    });
  });
});

describe("Cuando los efectos de ingredientes asociados llevarán los nombres: Frenzy", () => {
  describe("Cuando todos los ingredientes tienen el mismo atributo (INS)", () => {
    const ingredients = [
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

    it("El valor resultante del atributo será la media de los values de los ingredientes. Una vez calculada la media se redondeará al múltiplo de 5 inmediatamente inferior.", () => {
      const venomValue = Venom.calculateValue(ingredients);

      expect(potion.value).toBe(venomValue);
    });

    it("El tipo será venom", () => {
      expect(potion.type).toBe(PotionType.VENOM);
    });

    describe("Cuando todos los efectos son de tipo least", () => {
      it("El nombre de la poción será: Least + frenzy + venom", () => {
        expect(potion.name).toBe(`Least frenzy venom`);
      });
    });

    describe("Cuando todos los efectos son de tipo lesser", () => {
      const ingredients = [
        {
          _id: "6702b53d76863c206a48cd40",
          name: "Whispering Fern",
          description:
            "A fern that whispers strange voices, causing mild frenzy in the user.",
          value: 28,
          effects: ["lesser_frenzy"],
          image: "/images/ingredients/frenzy/frenzy_3.webp",
          type: "ingredient",
        },
        {
          _id: "6702b53d76863c206a48cd40",
          name: "Whispering Fern",
          description:
            "A fern that whispers strange voices, causing mild frenzy in the user.",
          value: 28,
          effects: ["lesser_frenzy"],
          image: "/images/ingredients/frenzy/frenzy_3.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Lesser + frenzy + venom", () => {
        expect(potion.name).toBe(`Lesser frenzy venom`);
      });
    });

    describe("Cuando todos los efectos son de tipo normal", () => {
      const ingredients = [
        {
          _id: "6702b53d76863c206a48cd3f",
          name: "Chaos Bloom",
          description:
            "A flower with erratic patterns that induces a deep sense of insanity.",
          value: 95,
          effects: ["frenzy"],
          image: "/images/ingredients/frenzy/frenzy_2.webp",
          type: "ingredient",
        },
        {
          _id: "6702b53d76863c206a48cd3f",
          name: "Chaos Bloom",
          description:
            "A flower with erratic patterns that induces a deep sense of insanity.",
          value: 95,
          effects: ["frenzy"],
          image: "/images/ingredients/frenzy/frenzy_2.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Frenzy + venom", () => {
        expect(potion.name).toBe(`Frenzy venom`);
      });
    });

    describe("Cuando todos los efectos son de tipo greater", () => {
      const ingredients = [
        {
          _id: "6702b53d76863c206a48cd3e",
          name: "Madcap Mushroom",
          description:
            "A twisted mushroom that drives the consumer to the edge of madness.",
          value: 285,
          effects: ["greater_frenzy"],
          image: "/images/ingredients/frenzy/frenzy_1.webp",
          type: "ingredient",
        },
        {
          _id: "6702b53d76863c206a48cd3e",
          name: "Madcap Mushroom",
          description:
            "A twisted mushroom that drives the consumer to the edge of madness.",
          value: 285,
          effects: ["greater_frenzy"],
          image: "/images/ingredients/frenzy/frenzy_1.webp",
          type: "ingredient",
        },
      ];

      const potion = Cauldron.createPotion(ingredients);

      it("El nombre de la poción será: Greater + frenzy + venom", () => {
        expect(potion.name).toBe(`Greater frenzy venom`);
      });
    });

    describe("Cuando todos los efectos son de tipo diferente", () => {
      const ingredients = [
        {
          _id: "6702b53d76863c206a48cd3e",
          name: "Madcap Mushroom",
          description:
            "A twisted mushroom that drives the consumer to the edge of madness.",
          value: 285,
          effects: ["greater_frenzy"],
          image: "/images/ingredients/frenzy/frenzy_1.webp",
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

      it("El nombre de la poción será: Modifier + frenzy + venom. El modificador del nombre será el que corresponda con el modificador de ingrediente más pequeño.", () => {
        const modifier = capitalize(
          Potion.getModifier(
            Potion.getNumIngredientsOfEachModifier(ingredients),
          ),
        );

        expect(potion.name).toBe(`${modifier} frenzy venom`);
      });
    });
  });
});

describe("Cuando alguno de los efectos de ingredientes no lleva el nombre “Setback” o “Frenzy", () => {
  const ingredients = [
    {
      _id: "6702b4f876863c206a48cd1d",
      name: "Starfall Blossom",
      description: "A rare blossom that boosts intelligence when night falls.",
      value: 68,
      effects: ["boost_intelligence"],
      image: "/images/ingredients/boost/boost_10.webp",
      type: "ingredient",
    },
    {
      _id: "6702b51d76863c206a48cd2a",
      name: "Dusk Fern",
      description:
        "A shadowy fern that clouds the mind, lowering intelligence.",
      value: 35,
      effects: ["lesser_setback_intelligence"],
      image: "/images/ingredients/setback/setback_2.webp",
      type: "ingredient",
    },
  ];

  const potion = Cauldron.createPotion(ingredients);

  it("No podremos crear el venom. El tipo de la poción creada no será “venom”", () => {
    expect(potion.type).not.toBe(PotionType.VENOM);
  });
});
