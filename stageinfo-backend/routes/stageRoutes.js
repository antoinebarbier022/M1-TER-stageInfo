const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const stageCtrl = require('../controllers/stageController');

router.get('/',invite, stageCtrl.getAllStage);
router.get('/:id', invite, stageCtrl.getOneStage);
router.get('/title/:name',invite, stageCtrl.getStageByTitle);
router.post('/',Etudiant, stageCtrl.createStage);
router.put('/:id', Etudiant,stageCtrl.editStage);
router.delete('/:id',Admin, stageCtrl.deleteOneStage);
router.delete('/', Admin, stageCtrl.deleteAllStage);

module.exports = router;
