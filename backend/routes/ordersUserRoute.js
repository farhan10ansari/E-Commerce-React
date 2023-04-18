const express=require("express");
const router=express.Router();
const checkAuthMiddle = require("../middlewares/checkAuthMiddle");
const ordersUser=require("../controllers/ordersUser");

router.get("/",checkAuthMiddle,ordersUser);

module.exports=router;