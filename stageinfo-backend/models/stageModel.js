const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageSchema = Schema({
    titre: {
      type : String,
      required: true
    },
    description: String,
    duree: {
      type : Number,
      required: true
    },
    datedebut: Date,
    etat: String,
    rapport: String,
    fichier: String, // c'est quoi ?
    conditions: String,
    objectif: String,
    avantages: String,
    datePropose: Date,
    dateValide : Date,
    resume : String,
    niveauRequis : { // M1 / M2 ...
      type : String,
      required: true
    }, 

    commentaires : [Schema.Types.ObjectId],

    // La table fiche_suivi ce situe dans le document stage
    ficheSuivi: new mongoose.Schema({ 
      dateDebut: Date,
      dateFin: Date,
      commentaireBilan: String,
      embauche: String,
      commentaireEmbauche : String,
      dateFiche : Date,
    }),

    // La table note_stage ce situe dans le document stage
    noteStage: new mongoose.Schema({
      date: Date,
      valeur: String,
      commentaire: String,
    }),
    
    parcours: { 
      idParcours: Schema.Types.ObjectId,
      nomComplet: String,
    },
    ajouteur:{
      idAjouteur: Schema.Types.ObjectId,
      nomComplet: String,
    },
    entreprise: { 
      idEntreprise: Schema.Types.ObjectId,
      nomComplet: String,
    },
    tuteurUniv: { 
      idTuteurUniv: Schema.Types.ObjectId,
      nomComplet: String,
    },
    tuteurEntreprise: { 
      idTuteurEntreprise: Schema.Types.ObjectId,
      nomComplet: String,
    },
    rapporteur: { 
      idRaporteur: Schema.Types.ObjectId,
      nomComplet: String,
    },
   
    etudiant: { 
      idEtudiant: Schema.Types.ObjectId,
      nomComplet: String,
    },
    
    // je sais pas ce que c'est
    idVisite: Schema.Types.ObjectId, 

  });

module.exports = mongoose.model('Stage', stageSchema);