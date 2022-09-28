const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );
    }catch( exception) {
        console.log( exception );
        throw new Error( 'Error to connect with database' );
    }
}

module.exports = {
    dbConnection
}