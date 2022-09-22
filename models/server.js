const express = require( 'express' );
var cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
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