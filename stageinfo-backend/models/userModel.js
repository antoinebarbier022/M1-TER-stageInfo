const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    nom : String,
    prenom : String,
    email : String,
    telephone : Number,
    fax : Number,
    hash : String, //password
    role : String,
    
    //etudiant
    numeroEtudiant : String,
    promotion : String,
    idParcours : Schema.Types.ObjectId,
    
    // representant_entreprise
    fonctionOccupee : String,
    idEntreprise : Schema.Types.ObjectId,
  });

module.exports = mongoose.model('User', userSchema);