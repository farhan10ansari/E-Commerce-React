const express=require("express");
const router=express.Router();


const checkAuthMiddle = require("../middlewares/checkAuthMiddle");

let cancelOrder=require("../controllers/cancelOrder");


router.post("/",checkAuthMiddle,cancelOrder);

module.exports = router;
 