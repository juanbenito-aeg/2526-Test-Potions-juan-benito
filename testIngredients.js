const testIngredients = [
   
    {
      "_id": "6702b39d76863c206a48cccc",
      "name": "Ironbark Berry",
      "description": "A hard berry that enhances hit points by a small amount.",
      "value": 25,
      "effects": [
         "increase_hit_points"
      ], 
      "image": "/images/ingredients/increase/increase_3.webp",
      "type": "ingredient"
    },
    {
      "_id": "6702b39d76863c206a48cccd",
      "name": "Moonleaf",
      "description": "A mystical leaf that offers a slight increase in hit points.",
      "value": 8,
      "effects": [
         "lesser_increase_hit_points"
      ],
      "image": "/images/ingredients/increase/increase_4.webp",
      "type": "ingredient"
    }
    
]

module.exports = {
    testIngredients
}