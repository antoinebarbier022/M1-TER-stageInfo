const express = require ('express');
const invite = require('../middleware/authInvi');
const Etudiant = require('../middleware/authEtudiant');
const TuteurResp = require('../middleware/authTuteurResp');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const pieceJointeCtrl = require('../controllers/pieceJointeController');

router.get('/',invite,pieceJointeCtrl.getAllPieceJointe);
router.get('/_id:',invite, pieceJointeCtrl.getOnePieceJointe);
router.post('/',Etudiant, pieceJointeCtrl.createPieceJointe);
router.put('/_id:', Etudiant,pieceJointeCtrl.editPieceJointe);
router.delete('/_id:',Admin, pieceJointeCtrl.deleteOnePieceJointe);
router.delete('/',Admin,pieceJointeCtrl.deleteAllPieceJointe);

module.exports = router;
