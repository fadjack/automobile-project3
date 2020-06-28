
const express = require("express")
const router = express.Router();
const carController = require('../controllers/cars.controller')

// Get
router.get('/add', carController.addcarPage);
router.get('/edit/:id', carController.editcarPage);

// Post
router.post('/add', carController.addcar);
router.post('/edit/:id', carController.editcar);
router.get('/delete/:id', carController.deletecar);

module.exports = router;