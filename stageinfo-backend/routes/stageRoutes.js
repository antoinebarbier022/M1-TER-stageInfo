const express = require('express');

const router = express.Router();

const stageCtrl = require('../controllers/stageController');

router.get('/', stageCtrl.getAllStage);
router.post('/', stageCtrl.createStage);
router.put('/:id', stageCtrl.editStage);
router.delete('/:id', stageCtrl.deleteStage);


module.exports = router;