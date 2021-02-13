const express = require('express');

const router = express.Router();

const salleCtrl = require('../controllers/salleControler');

router.get('/', salleCtrl.getAllSalle);
router.post('/', salleCtrl.postSalle);

module.exports = router;