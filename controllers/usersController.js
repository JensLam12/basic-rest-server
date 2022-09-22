const { response } = require('express');

const getUsers = ( req, res = response ) => {
    const { nombre, apikey } = req.query;

    res.json({
        msg: 'Get Api -- controlador',
        nombre,
        apikey
    });
}

const postUser = ( req, res = response ) => {
    const { name, age } = req.body;
    
    res.json({
        msg: 'Post Api -- controlador',
        name, 
        age
    });
}

const putUser = ( req, res = response ) => {
    const { id }= req.params;
    res.json({
        msg: 'Put Api -- controlador',
        id
    });
}

const deleteUser = ( req, res = response ) => {
    res.json({
        msg: 'Delete Api -- controlador'
    });
}


module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}