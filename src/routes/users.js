const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

const userController = new UserController();

router.get('/:user', userController.getOneUser);

router.post('/', userController.register);

module.exports = router;
