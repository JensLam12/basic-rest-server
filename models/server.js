const express = require( 'express' );
var cors = require('cors')
const { dbConnection } = require( '../database/config' );

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            users:     '/api/users',
            auth:      '/api/auth',
            category:  '/api/category',
            product:   '/api/product',
            search:   '/api/search',
        }
        
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
        this.app.use( this.path.auth, require( '../routes/authRoutes' ) ),
        this.app.use( this.path.users, require( '../routes/userRoutes' ) ),
        this.app.use( this.path.category, require( '../routes/categoriesRoutes' ) ),
        this.app.use( this.path.product, require( '../routes/productsRoutes' ) ),
        this.app.use( this.path.search, require( '../routes/searchRoute' ) )
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        })
    }
}

module.exports = Server