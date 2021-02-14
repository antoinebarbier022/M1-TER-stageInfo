const express = require('express');

const router = express.Router();

const stageCtrl = require('../controllers/stageController');

router.get('/', stageCtrl.getAllStage);
router.get('/:id', stageCtrl.getOneStage);
router.post('/', stageCtrl.createStage);
router.put('/:id', stageCtrl.editStage);
router.delete('/:id', stageCtrl.deleteOneStage);
router.delete('/', stageCtrl.deleteAllStage);

module.exports = router;
