const express = require('express');

const router = express.Router();

const entrepriseCtrl = require('../controllers/entrepriseController');

router.get('/',entrepriseCtrl.getAllEntreprise);
router.get('/_id:', entrepriseCtrl.getOneEntreprise);
router.put('/_id:', entrepriseCtrl.editEntreprise);
router.post('/', entrepriseCtrl.createEntreprise);
router.delete('/', entrepriseCtrl.deleteAllEntreprise);
router.delete('/_id:', entrepriseCtrl.deleteOneEntreprise);

module.exports = router ;
