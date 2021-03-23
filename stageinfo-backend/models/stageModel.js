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
    /*parcours: { 
      idParcours: Schema.Types.ObjectId,
      nomComplet: String,
    },*/
    ajouteur: {
      idAjouteur: Schema.Types.ObjectId,
      nomComplet: String,
    },
    entreprise:String,
    /*entreprise: { 
      idEntreprise: Schema.Types.ObjectId,
      nomComplet: String,
    },*/
    tuteurUniv: { 
      idTuteurUniv: Schema.Types.ObjectId,
      nomComplet: String,
    },
    tuteurEntreprise: { 
      idTuteurEntreprise: Schema.Types.ObjectId,
      nomComplet: String,
    },
    rapporteur: { 
      idRapporteur: Schema.Types.ObjectId,
      nomComplet: String,
    },
   
    etudiant: { 
      idEtudiant: Schema.Types.ObjectId,
      nomComplet: String,
    },
    
    idVisite: {
      typeContact: String,
      dateVisite: Date,
      commentaire: String
    }

  },
  {
    collection: 'Stage'
  });

module.exports = mongoose.model('Stage', stageSchema);