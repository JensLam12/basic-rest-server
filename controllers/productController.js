const { response } = require('express');
const { Product } = require('../models');

const obtainProducts = async (req, res = response) => {
    const { limit = 5, since = 1 } = req.query;
    const query = { state: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find({ query })
        .populate('category', 'name')
        .populate('user', 'name')
        .limit(limit)
        //.skip(since)
    ]);

    res.json({
        total,
        products
    });
}

const obtainProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category', 'name').populate('user', 'name');
    res.json(product);
}

const createProduct = async( req, res = response) => {
    const { state, user, ...body} = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if(productDB) {
        return res.status(400).json({
            msg: `The product ${productDB.name} already exists`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.AuthUser._id
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json(product);
}

const updateProduct = async( req,res = response ) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if( data.name ) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.AuthUser._id;

    const product = await Product.findByIdAndUpdate( id, data, {new: true });
    res.status(200).json(product);
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndUpdate(id, {state: false}, {new: true} );
    res.status(200).json( deletedProduct);
}

module.exports = {
    createProduct,
    deleteProduct,
    obtainProducts,
    obtainProduct,
    updateProduct
}