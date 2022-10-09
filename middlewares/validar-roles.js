const { response } = require( 'express' );

const isAdminRole = (req, res = response, next ) => {
    if( !req.AuthUser) {
        return res.status(500).json({
            msg: 'Tried to validate role without valid token'
        })
    }

    const { role, name } = req.AuthUser;

    if( role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin`
        })
    }

    next();
}

const hasRole = ( ...roles ) => {

    return(req, res = response, next) => {

        if( !req.AuthUser) {
            return res.status(500).json({
                msg: 'Tried to validate role without valid token'
            })
        }
    
        if( !roles.includes(req.AuthUser.role) ) {
            return res.status(401).json({
                msg: `It's require one of this roles ${roles}`
            });
        }

        next();
    };
}

module.exports = {
    isAdminRole,
    hasRole
}