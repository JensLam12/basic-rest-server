
const { response } = require('express');
const { model } = require('mongoose');
const path = require('path');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const fs = require('fs');

const loadFile = async (req, res = response) => {

    try {
        const name = await uploadFile(req.files, undefined, 'imgs/');

        res.status(200).json({
            name
        });
    }catch(exception) {
        console.log(exception);
        res.status(400).json({
            exception
        });
    }
}

const updateImage = async (req, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch(collection) {
        case 'users':
            model = await User.findById(id);
            if( !model) {
                return res.status(400).json({ msg: `User with id ${id} doesn't exists` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if( !model) {
                return res.status(400).json({ msg: `Product with id ${id} doesn't exists` });
            }
            break;
        default:
            return res.status(400).json({ msg: `ERROR` });
    }

    if( model.img ) {
        const pathImage = path.join( __dirname, '/../uploads/', collection, "/", model.img);
        if( fs.existsSync(pathImage) ) {
            fs.unlinkSync(pathImage);
        }
    }

    const name = await uploadFile( req.files, undefined, collection + '/');
    model.img = name;
    await model.save();
    
    res.status(200).json(model);
}

const updateImageCloudinary = async (req, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch(collection) {
        case 'users':
            model = await User.findById(id);
            if( !model) {
                return res.status(400).json({ msg: `User with id ${id} doesn't exists` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if( !model) {
                return res.status(400).json({ msg: `Product with id ${id} doesn't exists` });
            }
            break;
        default:
            return res.status(400).json({ msg: `ERROR` });
    }

    if( model.img ) {
        const nameArray = model.img.split('/');
        const name = nameArray[nameArray.length -1];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;
    await model.save();

    res.status(200).json(model);
}

const showImage = async (req, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch(collection) {
        case 'users':
            model = await User.findById(id);
            if( !model) {
                return res.status(400).json({ msg: `User with id ${id} doesn't exists` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if( !model) {
                return res.status(400).json({ msg: `Product with id ${id} doesn't exists` });
            }
            break;
        default:
            return res.status(400).json({ msg: `ERROR` });
    }

    if( model.img ) {
        const pathImage = path.join( __dirname, '/../uploads/', collection, "/", model.img);
        if( fs.existsSync(pathImage) ) {
            return res.sendFile(pathImage)
        }
    }

    const pathImage = path.join( __dirname, '/../assets/no_image.jpg');
    return res.sendFile(pathImage);
}

module.exports = {
    loadFile,
    updateImageCloudinary,
    showImage
}