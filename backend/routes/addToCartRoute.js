const express=require("express");

const router=express.Router();

const addToCart=require("../controllers/addToCart");

const checkAuthMiddle = require("../middlewares/checkAuthMiddle");

router.post("/",checkAuthMiddle,addToCart)

module.exports = router;