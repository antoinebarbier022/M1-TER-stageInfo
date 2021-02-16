const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pieceJointeSchema = Schema({
    nom: String, 
    type: String, 
    date: Date,  // changement année par la date
    size: Number,
    content: String,
    extension: String,

    idUser: Schema.Types.ObjectId, 
    idStage: Schema.Types.ObjectId, 
  },
  {
    collection: 'PieceJointe'
  });

module.exports = mongoose.model('PieceJointe', pieceJointeSchema);