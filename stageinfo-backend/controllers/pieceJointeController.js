const PieceJointe = require('../models/pieceJointeModel');

/**-----------------INSERTION DE PIECE______________________*/
exports.createPieceJointe = (req, res, next) => {
    const piecejointe = new PieceJointe({
        ...req.body
    });
    piecejointe.save()
        .then(() => {
            res.status(201).json({message: 'piece created!'})
        })
        .catch((error) => { res.status(400).json({ error: error});});
};
/**_______________________SELECTION DES PIECES_________________*/

exports.getAllPieceJointe =(req,res,next )=>{
    PieceJointe.find()
        .then(pieces => res.status(200).json(pieces))
        .catch(error =>res.status(400).json({error}));
};

exports.getOnePieceJointe = (req, res,next) => {
    PieceJointe.findOne({ _id: req.params.id})
        .then(piece => res.status(200).json(piece))
        .catch(error => res.status(404).json(error));

};
/***_______________________MODIFICATION DES PIECES________________*/

exports.editPieceJointe = (req, res, next) =>{
    const piecejointe = new PieceJointe ({
        _id: req.params.id,
        ...req.body
    });
    PieceJointe.update({_id: req.params.id},piecejointe)
        .then(() => {
            res.status(201).json({
                message: 'piece updated successfully!'
            });
        })
        .catch((error) => { res.status(400).json({ error: error});});
};

/**__________________SUPPRESSION DES PIECES________________________**/

exports.deleteOnePieceJointe = (req, res, next) => {
    PieceJointe.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({
                message: 'PIECE DELETED!'
            });
        })
        .catch((error) => { res.status(400).json({ error: error});});
};

exports.deleteAllPieceJointe = (req, res, next) => {
  PieceJointe.deleteMany({})
      .then(() => {
          res.status(200).json({
              message: 'ALL PIECES DELETED!'
          });
      })
      .catch((error) => { res.status(400).json({ error: error});});

};
