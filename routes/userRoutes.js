const { Router } = require('express');
const { body } = require('express-validator');
const { getUsers, postUser, putUser, deleteUser } = require('../controllers/usersController');
const { validateFields } = require( '../middlewares/validate-fields' );
const { validRole, validEmailExists, validateExistsUser } = require( '../helpers/db-validator' );

const router = Router();

router.get('/', getUsers )
router.post('/', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('email').custom( validEmailExists ),
    body('password', 'Password must be at least six letters').isLength({ min: 6 }),
    body('role').custom( validRole ),
    validateFields
], postUser)
router.put('/:id', [
    body( 'id', 'Invalid Id').isMongoId(),
    body( 'id').custom( validateExistsUser ),
    body('role').custom( validRole ),
    validateFields
], putUser)
router.delete('/:id', [
    //body('id', 'Invalid Id').isMongoId(),
    body('id').custom( validateExistsUser ),
    validateFields
], deleteUser)

module.exports = router;