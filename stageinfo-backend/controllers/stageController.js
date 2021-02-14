const Stage = require('../models/stageModel');

/**
 * @api {get} /stage Get all Stages
 * @apiName GetAllStage
 * @apiGroup Stage
 */
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

/**
 * @api {get} /stage Get a Stage
 * @apiName GetOneStage
 * @apiGroup Stage
 *
 * @apiParam {Number} id Stage's unique ID.
 *
 */
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

/**
 * @api {post} /stage Create a new Stage
 * @apiName CreateStage
 * @apiGroup Stage
 */
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

/**
 * @api {put} /stage/:id Edit a Stage
 * @apiName EditStage
 * @apiGroup Stage
 *
 * @apiParam {Number} id Stage's unique ID.
 */
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

/**
 * @api {delete} /stage Delete a stage
 * @apiName DeleteOneStage
 * 
 * @apiGroup Stage
 *
 * @apiParam {Number} id Stage's unique ID.
 */
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

/**
 * @api {delete} /stage Delete all stages
 * @apiName DeleteAllStage
 * @apiGroup Stage
 *
 */
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
