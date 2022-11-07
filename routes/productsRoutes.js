const { Router } = require('express');
const { body } = require('express-validator');
const { createProduct, obtainProducts, obtainProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');
const { validateExistsCategory, validateExistsProduct} = require('../helpers/db-validator')

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
], obtainProducts);

router.get('/:id', [
    validateJWT,
    body('id').custom(validateExistsProduct),
    validateFields
], obtainProduct);

router.post('/', [
    validateJWT,
    body( 'name', 'Name is required').not().isEmpty(),
    body('categoryId').custom(validateExistsCategory),
    validateFields
], createProduct);

router.put('/:id',[
    validateJWT,
    body( 'name', 'Name is required').not().isEmpty(),
    body('id').custom(validateExistsProduct),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    body('id').custom(validateExistsProduct),
    validateFields
], deleteProduct);

module.exports = router;