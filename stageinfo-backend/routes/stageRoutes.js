const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const stageCtrl = require('../controllers/stageController');
const multer = require('../middleware/multer-config')

router.get('/',invite, stageCtrl.getAllStage);
router.get('/:id', invite, stageCtrl.getOneStage);
router.post('/',Etudiant,multer, stageCtrl.createStage);
router.put('/:id', Etudiant,multer,stageCtrl.editStage);
router.delete('/:id',Admin, stageCtrl.deleteOneStage);
router.delete('/', Admin, stageCtrl.deleteAllStage);

module.exports = router;
