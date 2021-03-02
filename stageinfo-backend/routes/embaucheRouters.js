const  express = require('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const embaucheCtrl = require('../controllers/embaucheController');

router.get('/',Etudiant, embaucheCtrl.getAllEmbauche);
router.get('/_id:',Etudiant, embaucheCtrl.getOneEmbauche);
router.post('/',Admin, embaucheCtrl.createEmbauche);
router.put('/_id:', Admin,embaucheCtrl.editEmbauche);
router.delete('/_id:', Admin,embaucheCtrl.deleteOneEmbauche);
router.delete('/', Admin,embaucheCtrl.deleteAllEmbauche);

module.exports = router;
