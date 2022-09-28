const { Schema, model} = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [ true, 'Role is required']
    }
},{collection : 'roles'});

module.exports = model( 'Role', RoleSchema );