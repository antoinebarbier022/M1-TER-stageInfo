const express = require('express');

const router = express.Router();

const salleCtrl = require('../controllers/salleController');

router.get('/', salleCtrl.getAllSalle);
router.post('/', salleCtrl.postSalle);

module.exports = router;
