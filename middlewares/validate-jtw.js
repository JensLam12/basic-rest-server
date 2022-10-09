const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require( '../models/user' );

const validateJWT = async ( req = request, res = response, next) => {
    const token = req.header('x-token');

    if( !token) {
        return res.status(401).json({
            msg: 'There is no token'
        });
    }

    try {
        const { uuid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById({ _id: uuid });

        if(!user) {
            return res.status(401).json({
                msg: `invalid token - User doesn't exist`
            });
        }


        if(!user.state) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.AuthUser = user;
        next();

    } catch( exception) {
        console.log(exception);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
}
