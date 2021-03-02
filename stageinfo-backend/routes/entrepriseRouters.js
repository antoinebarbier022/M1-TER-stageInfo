const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const entrepriseCtrl = require('../controllers/entrepriseController');

router.get('/',Etudiant,entrepriseCtrl.getAllEntreprise);
router.get('/_id:',Etudiant, entrepriseCtrl.getOneEntreprise);
router.put('/_id:', Etudiant,entrepriseCtrl.editEntreprise);
router.post('/', Etudiant,entrepriseCtrl.createEntreprise);
router.delete('/',Admin, entrepriseCtrl.deleteAllEntreprise);
router.delete('/_id:',Admin, entrepriseCtrl.deleteOneEntreprise);

module.exports = router ;
