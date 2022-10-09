const jwt = require( 'jsonwebtoken' );

const generateJWT = ( uuid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uuid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '20d'
        },( error, token) => {
            console.log(error);
            console.log(token);
            if( error) {
                console.log(error);
                reject('token generation failed');
            } else {
                resolve(token);
            }
        });
    });

}

module.exports = {
    generateJWT
}