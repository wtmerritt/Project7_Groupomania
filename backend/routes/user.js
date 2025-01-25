const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
// FIXME Add auth middleware to Delete
router.delete('/:id', userController.deleteAccount);

module.exports = router;