const express = require('express');
const Admin = require('../middleware/authAdmin');

const router = express.Router();

const emailContactCtrl = require('../controllers/emailContactController');

router.get('/', Admin,emailContactCtrl.getAllEmail);
router.put('/', Admin,emailContactCtrl.editEmail);
module.exports = router;