const { Category } = require('../models');
const Role = require( '../models/role' );
const User = require( '../models/user' );

const validRole = async( role = '' ) => {
    const existRole = await Role.findOne({ role });
    const roles = await Role.find({});
    if( !existRole ) {
        throw new Error( `Role ${ role} doesn't exists` );
    }
}

const validEmailExists = async( email = '' ) => {
    const emailExists = await User.findOne({ email });
    if( emailExists) {
        throw new Error( `Email ${ email} was registered before` );
    }
}

const validateExistsUser = async ( id ) => {
    const userExist = await User.findOne({ id });
    if( !userExist ) {
        throw new Error( `Id ${ id} doesn't exist` );
    }
}

const validateExistsCategory = async ( id ) => {
    const categoryExist = await Category.findOne({ id });
    if( !categoryExist ) {
        throw new Error( `Id ${ id} doesn't exist` );
    }
}

module.exports = {
    validRole,
    validEmailExists,
    validateExistsUser,
    validateExistsCategory
}