const { Router } = require('express');
const { body } = require('express-validator');
const { login, googleSignIn } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validateFields
], login );

router.post('/google',[
    body('id_token', 'Id_token is required').not().isEmpty(),
    validateFields
], googleSignIn )

module.exports = router;