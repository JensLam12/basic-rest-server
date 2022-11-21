const { Router } = require('express');
const { body } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { loadFile, updateImageCloudinary, showImage } = require('../controllers/uploadsController');
const { validateFiletoUpload } = require('../middlewares');

const router = Router();

router.post( '/', [
    validateFiletoUpload,
    validateFields
],loadFile );

router.put( '/:collection/:id', [
    body('collection', `Collection doesn't allowed`).isIn( 'collection', ['users', 'products'] ),
    validateFiletoUpload,
    validateFields
], updateImageCloudinary);

router.get( '/:collection/:id', [
    body('collection', `Collection doesn't allowed`).isIn( 'collection', ['users', 'products'] ),
    validateFields
], showImage);

module.exports = router;