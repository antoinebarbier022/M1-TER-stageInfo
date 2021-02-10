
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salleSchema = Schema({
    nom: String,
    batiment: String,
    capacite: Number,
    commentaire: String, 
  });

module.exports = mongoose.model('Salle', salleSchema);