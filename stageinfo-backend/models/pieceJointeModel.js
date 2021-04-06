const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pieceJointeSchema = Schema({
    nom: String, 
    chemin : String,

    idUser: Schema.Types.ObjectId, 
    idStage: Schema.Types.ObjectId, 
  },
  {
    collection: 'PieceJointe'
  });

module.exports = mongoose.model('PieceJointe', pieceJointeSchema);
