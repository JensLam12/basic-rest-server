const { Router } = require('express');
const { getUsers, postUser, putUser, deleteUser } = require('../controllers/usersController');

const router = Router();

router.get('/', getUsers )
router.post('/', postUser)
router.put('/:id', putUser)
router.delete('/', deleteUser)

module.exports = router;