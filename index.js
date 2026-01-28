const { testIngredients } = require ('./testIngredients');
const { Cauldron }  = require ('./cauldron');

console.log(testIngredients);

const potion = Cauldron.createPotion(testIngredients);

console.log(potion);