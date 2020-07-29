const express = require("express");
const router = express.Router();
const homeController = require('../controllers/home.controller');

router.get('/', homeController.getHomePage);
router.get('/Pagesingle/:id', homeController.getcarSingle);
router.get('/apisearch', homeController.search);


module.exports = router;




