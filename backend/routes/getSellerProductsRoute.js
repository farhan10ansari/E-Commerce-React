const express=require("express");
const router=express.Router();

const getSellerProducts=require("../controllers/getSellerProducts");

const checkAuthMiddle = require("../middlewares/checkAuthMiddle");

router.post("/",checkAuthMiddle,getSellerProducts);


module.exports=router;