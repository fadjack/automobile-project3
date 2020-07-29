const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')

router.get("/dashboard/:id",userController.getuserpage)
router.post("/dashboard/:id",userController.postuserpage)


module.exports = router;