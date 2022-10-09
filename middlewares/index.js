const validateFields = require( '../middlewares/validate-fields' );
const validateJWT = require( '../middlewares/validate-jtw' );
const validateRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles
}