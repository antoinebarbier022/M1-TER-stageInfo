const Stage = require('../models/stageModel');

exports.getAllStage = (req, res, next) => {
  Stage.find().then(
    (stages) => {
      res.status(200).json(stages);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneStage = (req, res, next) => {
  Stage.findOne({
    _id: req.params.id
  }).then(
    (stage) => {
      res.status(200).json(stage);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.createStage = (req, res, next) => {
  console.log(req.body);
  const stage = new Stage({
    ...req.body
  });

  stage.save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    })
    .catch((error) => { res.status(400).json({ error: error});});
};

exports.editStage = (req, res, next) => {
  console.log(req.body);
  const stage = new Stage({
    _id: req.params.id,
    ...req.body
  });

  Stage.updateOne({_id: req.params.id}, stage)
    .then(() => {
      res.status(201).json({
        message: 'Stage updated successfully!'
      });
    })
    .catch((error) => { res.status(400).json({ error: error});});
};


exports.deleteOneStage = (req, res, next) => {
  Stage.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Stage deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteAllStage = (req, res, next) => {
  Stage.deleteMany({}).then(
    () => {
      res.status(200).json({
        message: 'All Stages deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
