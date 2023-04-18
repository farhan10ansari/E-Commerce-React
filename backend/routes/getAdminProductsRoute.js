const express=require("express");
const router=express.Router();

const getAdminProducts=require("../controllers/getAdminProducts");

const checkAuthMiddle = require("../middlewares/checkAuthMiddle");

router.post("/",checkAuthMiddle,getAdminProducts);


module.exports=router;