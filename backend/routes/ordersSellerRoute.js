const express=require("express");
const router=express.Router();
const checkAuthMiddle=require("../middlewares/checkAuthMiddle");
const ordersSeller=require("../controllers/ordersSeller");

router.get("/",checkAuthMiddle,ordersSeller);

module.exports=router;