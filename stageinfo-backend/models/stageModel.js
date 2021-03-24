const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageSchema = Schema({
    titre: String,
    description: String,
    duree: String,
      
    dateDebut: String,
    etat: String,
    rapport: String,
    fichier: String, // c'est quoi ?
    conditions: String,
    objectif: String,
    salaire: String,
    competences: String,
    avantages: String,
    datePropose: Date,
    dateValide : Date,
    resume : String,
    niveauRequis : String, // M1, M2...

    commentaires : [new mongoose.Schema({
      idUser: {
        type : Schema.Types.ObjectId,
        required: true
      },
      dateCommentaire: {
        type : Date,
        default: new Date()
      },
      message: {
        type : String,
        required: true
      },
    })],

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
    parcours : String,
    entreprise: String,
    /*
    parcours: {
      Type: Schema.Types.ObjectId,
      ref: 'Parcours',
    },
    ajouteur: {
      Type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    entreprise: {
      Type: Schema.Types.ObjectId,
      ref: 'Entreprise',
    },
    tuteurUniv: {
      Type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    tuteurEntreprise: {
      Type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    rapporteur: {
      Type: Schema.Types.ObjectId,
      ref: 'Users',
    },
   
    etudiant: {
      Type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    
    idVisite: {
      typeContact: String,
      dateVisite: Date,
      commentaire: String
    }*/

  },
  {
    collection: 'Stage'
  });

module.exports = mongoose.model('Stage', stageSchema);