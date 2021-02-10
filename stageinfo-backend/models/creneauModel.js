const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creneauSchema = Schema({
    dateDeb: Date, 
    heureDeb: Number,  
    Dispo: Boolean,  
    commentaire: String,

    idSalle: Schema.Types.ObjectId, //id de la salle
  });

module.exports = mongoose.model('Creneau', creneauSchema);