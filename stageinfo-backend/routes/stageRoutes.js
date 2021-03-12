const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const stageCtrl = require('../controllers/stageController');

router.get('/',stageCtrl.getAllStage);
router.get('/:id', stageCtrl.getOneStage);
router.get('/title/:name', stageCtrl.getStageByTitle);
router.get('/search/:keyword', stageCtrl.getStageByKeyword);
router.post('/', stageCtrl.createStage);
router.put('/:id', Etudiant,stageCtrl.editStage);
router.delete('/:id',Admin, stageCtrl.deleteOneStage);
router.delete('/', Admin, stageCtrl.deleteAllStage);

module.exports = router;
