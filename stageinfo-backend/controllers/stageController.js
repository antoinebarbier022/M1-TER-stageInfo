const Stage = require('../models/stageModel');

exports.getAllStage = (req, res, next) => {
  res.status(200).json({message : "Récupération de la liste des stages !"});
  /*Stage.find().then(
    (stages) => {
      res.status(200).json(stages);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );*/
};

