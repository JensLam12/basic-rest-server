const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const allowedCollections = [
    'user',
    'category',
    'product',
    'rol'
];

const searchUsers = async( term = '', res = response) => {
    const isMongoId = ObjectId.isValid( term );
    
    if( isMongoId ) {
        const user = await User.findById(term);
        return res.json({
            results: ( user ) ? [user] : []
        });
    }

    const regex = new RegExp( term, 'i');
    const users = await User.find({ 
        $or: [
            {name: regex},
            {email: regex}
        ],
        $and: [ { state: true}]
     });

    res.json({
        results: users
    });
}

const searchCategory = async( term = '', res = response) => {
    const isMongoId = ObjectId.isValid( term );
    
    if( isMongoId ) {
        const category = await User.findById(term);
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( term, 'i');
    const categories = await Category.find({ 
        $and: [ { state: true }, { name: regex } ]
     });

    res.json({
        results: categories
    });
}

const searchProduct = async( term = '', res = response) => {
    const isMongoId = ObjectId.isValid( term );
    
    if( isMongoId ) {
        const product = await Product.findById(term);
        return res.json({
            results: ( product ) ? [product] : []
        });
    }

    const regex = new RegExp( term, 'i');
    const products = await Product.find({ 
        $and: [ { state: true}, {name: regex},]
     });

    res.json({
        results: products
    });
}

const search = async (req, res = response) => {
    const { collection, term } = req.params;

    if(!allowedCollections.includes(collection)) {
        res.status(400).json({
            msg: `The collections allowed are ${ allowedCollections }`
        });
    }

    switch( collection ) {
        case 'user':
            searchUsers( term, res );
        break;
        case 'category':
            searchCategory( term, res );
        break;
        case 'product':
            searchProduct( term, res );
        break;
        default:
            res.status(500).json({
                msg: `Don't do dude!`
            });
    }

}

module.exports = {
    search
}