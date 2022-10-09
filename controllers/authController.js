const { response } = require('express');
const User = require( '../models/user' );
const bcryptjs = require( 'bcryptjs' );
const { generateJWT } = require('../helpers/generateJWT');

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                msg: 'User / password invalid'
            });
        }

        if(!user.state) {
            return res.status(400).json({
                msg: 'User / password invalid - state false'
            });
        }

        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Invalid password'
            });
        }

        const token = await generateJWT( user._id );

        res.json({
            user,
            token
        });

    } catch( exception) {
        console.log( exception);
        res.status(500).json({
            msg: 'Login ok'
        });
    }
}

module.exports = {
    login
}