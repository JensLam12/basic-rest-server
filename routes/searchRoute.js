const { Router } = require('express');
const { search } = require('../controllers/searchController');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.get('/:collection/:term', [
    validateJWT,
    validateFields
], search);


module.exports = router;