const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = Schema({
    nom : String,
    prenom : String,
    email : {type: String, required: true},
    telephone : Number,
    fax : Number,
    hash : String, //password
    role : {type: String, required: true},
    
    //etudiant
    numeroEtudiant : String,
    promotion : String,
    idParcours : Schema.Types.ObjectId,
    
    // representant_entreprise
    fonctionOccupee : String,
    idEntreprise : Schema.Types.ObjectId,
  },
  {
    collection: 'User'
  });
  
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
