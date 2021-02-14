const express = require('express');

const router = express.Router();

const stageCtrl = require('../controllers/stageController');

router.get('/', stageCtrl.getAllStage);
router.get('/:id',stageCtrl.getOneStage);
router.delete('/:id',stageCtrl.deleteStage);
router.post('/',stageCtrl.createStage);
router.put('/:id',stageCtrl.modifyStage);

module.exports = router;
