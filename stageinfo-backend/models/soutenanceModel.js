const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soutenanceSchema = Schema({
    titre: String,
    etudiant: String,           // nom de l'étudiant
    tuteurUniv: String,         // nom du tuteur de l'université
    tuteurEntreprise: String,   // nom du tuteur de l'entreprise
    rapporteur: String, 	    // nom du rapporteur
    entreprise: String,         // nom entreprise	
    commentaire: String,        // il faudrait aussi qu'il y ai l'id de celui qui a poster le commentaire
    session: Number,            // session 1 ou 2
    
    idStage: Schema.Types.ObjectId,
    idCreneau: Schema.Types.ObjectId,
  });

module.exports = mongoose.model('Soutenance', soutenanceSchema);