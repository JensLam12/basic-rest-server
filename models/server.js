const express = require( 'express' );
var cors = require('cors')
const { dbConnection } = require( '../database/config' );

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        //Connect to database
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // Public directory
        this.app.use( express.static( 'public' ) );
        // Cors
        this.app.use(cors());
        // Reading and parse of body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.usersPath , require( '../routes/userRoutes' ) )
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        })
    }
}

module.exports = Server