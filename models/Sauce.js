
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({// Create the sauce schema for the database

  userId: { type: String, required: true },
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 3,
    trim: true,
    match: /^[ aàâäéèêëîïôöùûüÿç.-zA-Z0-9 _.,!()&]+$/
  },
  manufacturer: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
    trim: true,
    match: /^[ aàâäéèêëîïôöùûüÿç.-zA-Z0-9 _.,!()&]+$/
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
    trim: true,
    match: /^[ aàâäéèêëîïôöùûüÿç.-zA-Z0-9 _.,!()&]+$/
  },
  mainPepper: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
    trim: true,
    match: /^[ aàâäéèêëîïôöùûüÿç.-zA-Z0-9 _.,!()&]+$/
  },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model('Sauce DATA', sauceSchema);



