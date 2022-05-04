const mongoose = require('mongoose');

//La méthode  Schema  de Mongoose te permet de créer un schéma de données 
//pour ta base de données MongoDB.

const sauceSchema = mongoose.Schema({//On définit les propriétés de notre modèle.

  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },

});

//La méthode  "model"  transforme ce modèle en un modèle utilisable.
module.exports = mongoose.model('Sauce DATA', sauceSchema);



