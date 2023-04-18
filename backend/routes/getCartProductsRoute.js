const express=require("express");

const router=express.Router();

const getCartProducts=require("../controllers/getCartProducts");



const checkAuthMiddle=require("../middlewares/checkAuthMiddle");





router.get("/",checkAuthMiddle,getCartProducts);

module.exports = router;
