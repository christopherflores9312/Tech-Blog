const express = require('express');
const router = express.Router();

const userController = require('./userController');
const postController = require('./postController');
// Import other controllers as needed

router.use('/users', userController);
router.use('/posts', postController);
// Add other routes as needed

module.exports = router;
