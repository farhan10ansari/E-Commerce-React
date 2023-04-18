const express=require("express");
const router=express.Router();

const getProducts=require("../controllers/getProducts");

const checkAuthMiddle = require("../middlewares/checkAuthMiddle");

router.post("/",checkAuthMiddle,getProducts);


module.exports=router;