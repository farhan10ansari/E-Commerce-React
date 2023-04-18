const express=require("express");
const router=express.Router();


const deleteProduct=require("../controllers/deleteProduct");

const checkAuthMiddle=require("../middlewares/checkAuthMiddle");

router.post("/",checkAuthMiddle,deleteProduct);

module.exports = router;
 