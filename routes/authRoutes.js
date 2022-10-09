const { Router } = require('express');
const { body } = require('express-validator');
const { login } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validateFields
], login )

module.exports = router;