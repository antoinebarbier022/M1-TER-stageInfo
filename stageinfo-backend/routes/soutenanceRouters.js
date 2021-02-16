const express = require('express');

const router = express.Router();

const soutenanceCtrl = require('../controllers/soutenanceController');

router.get('/:id', soutenanceCtrl.getOneSoutenance);
router.get('/', soutenanceCtrl.getAllSoutenance);
router.post('/', soutenanceCtrl.createSoutenance);
router.put('/:id', soutenanceCtrl.editSoutenance);
router.delete('/:id', soutenanceCtrl.deleteOneSoutenance);
router.delete('/', soutenanceCtrl.deleteAllSoutenance);

module.exports = router;
