const express = require('express');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const emailContactCtrl = require('../controllers/creneauController');

router.get('/',Admin, emailContactCtrl.getAllEmail);
router.post('/', Admin,emailContactCtrl.createEmail);
router.put('/:id', Admin,emailContactCtrl.editEmail);
module.exports = router;