const { Cauldron } = require("../cauldron");

describe("Cuando el número de ingredientes es menor que 2 o mayor que 4", () => {
  it("crearemos el Tonic of Downfall.", () => {
    const sicklySap = {
      _id: "6702b46b76863c206a48ccfb",
      name: "Sickly Sap",
      description: "A viscous sap that slows movement and reduces dexterity.",
      value: 175,
      effects: ["greater_damage_dexterity"],
      image: "/images/ingredients/damage/damage_9.webp",
      type: "ingredient",
    };

    const ingredients1 = [sicklySap];
    const potion1 = Cauldron.createPotion(ingredients1);

    const ingredients2 = [];
    for (let i = 0; i < 5; i++) {
      ingredients2.push(sicklySap);
    }
    const potion2 = Cauldron.createPotion(ingredients2);

    const TONIC_DOWNFALL = "Tonic of Downfall";

    expect(potion1.name).toBe(TONIC_DOWNFALL);
    expect(potion2.name).toBe(TONIC_DOWNFALL);
  });
});
