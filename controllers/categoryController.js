const { response } = require('express');
const { Category } = require('../models');

//obtenercategoria - populate {}

const obtainCategories = async (req, res = response) => {
    const { limit = 5, since = 1 } = req.query;
    const query = { state: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find({ query })
        .populate('user', 'name')
        .limit(limit)
        //.skip(since)
    ]);

    res.json({
        total,
        categories
    });
}

const obtainCategory = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.json(category);
}

const createCategory = async( req, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });

    if(categoryDB) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} already exists`
        });
    }

    const data = {
        name,
        user: req.AuthUser._id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
}

//actualizar categoria
// borrar categoria - estado : false

module.exports = {
    createCategory,
    obtainCategories,
    obtainCategory
}