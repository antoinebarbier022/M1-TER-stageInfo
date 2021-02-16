const  express = require('express');

const router = express.Router();

const embaucheCtrl = require('../controllers/embaucheController');

router.get('/', embaucheCtrl.getAllEmbauche);
router.get('/_id:', embaucheCtrl.getOneEmbauche);
router.post('/', embaucheCtrl.createEmbauche);
router.put('/_id:', embaucheCtrl.editEmbauche);
router.delete('/_id:', embaucheCtrl.deleteOneEmbauche);
router.delete('/', embaucheCtrl.deleteAllEmbauche);

module.exports = router;
