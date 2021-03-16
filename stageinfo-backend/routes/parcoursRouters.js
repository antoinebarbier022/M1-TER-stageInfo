const express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const parcoursCtrl = require('../controllers/parcoursController');

router.get('/', parcoursCtrl.getAllParcours);
router.get('/:id' , parcoursCtrl.getOneParcours);
router.post('/', parcoursCtrl.createParcours);
router.put('/:id',parcoursCtrl.editParcours);
router.delete('/:id', parcoursCtrl.deleteOneParcours);

module.exports = router;
