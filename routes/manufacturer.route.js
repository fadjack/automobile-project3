
const express = require("express")
const router = express.Router();
const manufacturerController = require('../controllers/manufacturers.controller')

// Get
router.get('/add',manufacturerController.addmanufacturerPage);
//router.get('/edit/:id', clubController.editClubPage);

// Post
router.post('/add', manufacturerController.addmanufacturer);
// router.post('/edit/:id', clubController.editClub);
// router.get('/delete/:id', clubController.deleteClub);

module.exports = router;
