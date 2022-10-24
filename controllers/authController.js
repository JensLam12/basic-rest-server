const { response, json } = require('express');
const User = require( '../models/user' );
const bcryptjs = require( 'bcryptjs' );
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async ( req, res = response ) => {
    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({email});

        if( !user ) {
            const data = {
                name,
                email, 
                password: ':P',
                img,
                google: true,
                role: 'USER_ROLE'
            }

            user = new User(data);
            await user.save();
        }

        if( !user.state) {
            res.status(401).json({
                ok: false,
                msg: `User blocked`
            });
        }

        const token = await generateJWT( user._id );

        res.json({
            msg: 'OK',
            user,
            token
        });
    } catch( exception) {
        res.status(400).json({
            ok: false,
            msg: `Token can't be verified`
        });
    }
}

module.exports = {
    login,
    googleSignIn
}