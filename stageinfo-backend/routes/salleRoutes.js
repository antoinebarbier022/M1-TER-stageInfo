const express = require('express');

const router = express.Router();

const salleCtrl = require('../controllers/salleController');

router.get('/:id', salleCtrl.getOneSalle);
router.get('/', salleCtrl.getAllSalle);
router.post('/', salleCtrl.createSalle);
router.put('/:id', salleCtrl.editSalle);
router.delete('/:id', salleCtrl.deleteOneSalle);
router.delete('/', salleCtrl.deleteAllSalle);

module.exports = router;
