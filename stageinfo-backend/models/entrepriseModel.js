const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrepriseSchema = Schema({
    idRespAdm: Schema.Types.ObjectId,  // id responsable administrateur je crois

    nom: String,
    website: String,
    description: String,
    siret: String,
    telephone: Number,
    fax: Number,

    adresse: new mongoose.Schema({ // la table pgs_adresse directement dans entreprise
      voie: String,
      ville: String,
      codePostal: String,
      complement: String,
    }),
    
    secteurActivite: String,
    nbSalaries: Number,
    local: Boolean,             // true si l'entreprise possède un local, false sinon
    chiffreAffaire: String,     // chiffre affaire de l'entreprise mais de quand ???
  });

module.exports = mongoose.model('Entreprise', entrepriseSchema);