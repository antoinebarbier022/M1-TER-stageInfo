const express = require('express');
const  router = express.Router();
const userctrl = require ('../controllers/userControllers');

router.get('/', userctrl.getAllUser);
router.get('/:id', userctrl.getOneUser);

router.post('/signup',userctrl.signup);
router.post('/login',userctrl.login);
router.get('/email/:id', userctrl.getemail);
router.get('/role/:id', userctrl.getRole);




module.exports = router;
