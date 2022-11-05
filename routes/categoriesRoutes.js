const { Router } = require('express');
const { body } = require('express-validator');
const { createCategory, obtainCategories, obtainCategory } = require('../controllers/categoryController');
const { validateFields, validateJWT } = require('../middlewares');
const { validateExistsCategory} = require('../helpers/db-validator')

const router = Router();

// Get all categories
router.get('/', [
    validateJWT,
    validateFields
],obtainCategories);

router.get('/:id', [
    validateJWT,
    body('id').custom(validateExistsCategory),
    validateFields
], obtainCategory);

router.post('/', [
    validateJWT,
    body( 'name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory);

router.put('/:id', (req,res) => {
    res.json('put');
});

router.delete('/:id', (req,res) => {
    res.json('delete');
});

module.exports = router;