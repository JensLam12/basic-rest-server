const validateFields = require( '../middlewares/validate-fields' );
const validateJWT = require( '../middlewares/validate-jtw' );
const validateRoles = require('../middlewares/validar-roles');
const validateFile = require('../middlewares/validate-file');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFile
}