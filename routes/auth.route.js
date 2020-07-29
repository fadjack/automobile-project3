const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Get
router.get('/login', authController.loginPage);
router.get('/register', authController.registerPage);
router.get('/logout', authController.logout);

// Post
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);


module.exports = router;
