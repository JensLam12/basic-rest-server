const { response } = require('express');
const User = require( '../models/user' );
const bcryptjs = require( 'bcryptjs' );

const getUsers = async ( req, res = response ) => {
    const { limit = 5, since = 1 } = req.query;
    const query = { state: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find({ query })
        .limit(limit)
        .skip(since)
    ]);

    res.json({
        total,
        users
    });
}

const postUser = async ( req, res = response ) => {
    
    const { name, email, password, role} = req.body;
    const user = new User( { name, email, password, role});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    
    // Save in database
    await user.save();
    
    res.json({
        user
    });
}

const putUser = async ( req, res = response ) => {
    const { id } = req.params;
    const { password, google, email, ...rest } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }
    const user = await User.findByIdAndUpdate( id, rest, { new: true } );

    res.json({
        user
    });
}

const deleteUser = async ( req, res = response ) => {
    const { id } = req.params;

    const uuid = req.uuid;

    // Delete permantenly
    //const user = await User.findByIdAndUpdate( id );

    const user = await User.findByIdAndUpdate( id, { state: false }, { new: true }  )
    const authUser = req.AuthUser;
    res.json({
        user,
        authUser
    });
}


module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}