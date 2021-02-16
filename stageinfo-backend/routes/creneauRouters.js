const express = require('express');

const router = express.Router();

const creneauCtrl = require('../controllers/creneauController');

router.get('/:id', creneauCtrl.getOneCreneau);
router.get('/', creneauCtrl.getAllCreneau);
router.post('/', creneauCtrl.createCreneau);
router.put('/:id', creneauCtrl.editCreneau);
router.delete('/:id', creneauCtrl.deleteOneCreneau);
router.delete('/', creneauCtrl.deleteAllCreneau);

module.exports = router;
