const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin.controller');


router.get('/', adminController.getAdminPage);


// Get
//router.get("/cars/:id",adminController.editcarPage)
//router.get("/cars/list",adminController.getAdminlistAdd);
router.get("/cars/add", adminController.getAdminCarsAdd);
router.get('/cars/edit/:id', adminController.editcarPage)
router.get('cars/delete/:id', adminController.deletecar);
//router.get('/cars/:id', adminController.getcarSingle);


// Post
router.post("/cars/add", adminController.postAdminCarsAdd);
router.post("/cars/edit/:id", adminController.editcar);
router.get("/cars/delete/:id", adminController.deletecar);
//router.post('/addcar', adminController.addcar);

module.exports = router;
