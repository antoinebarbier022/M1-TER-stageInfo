const express = require('express');

const router = express.Router();

const stageCtrl = require('../controllers/stageController');

router.get('/', stageCtrl.getAllStage);


module.exports = router;