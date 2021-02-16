const express = require ('express');

const router = express.Router();

const pieceJointeCtrl = require('../controllers/pieceJointeController');

router.get('/',pieceJointeCtrl.getAllPieceJointe);
router.get('/_id:', pieceJointeCtrl.getOnePieceJointe);
router.post('/', pieceJointeCtrl.createPieceJointe);
router.put('/_id:', pieceJointeCtrl.editPieceJointe);
router.delete('/_id:', pieceJointeCtrl.deleteOnePieceJointe);
router.delete('/',pieceJointeCtrl.deleteAllPieceJointe);

module.exports = router;
