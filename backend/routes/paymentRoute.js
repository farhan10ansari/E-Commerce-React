const express=require("express");

const router=express.Router();

const payment=require("../controllers/payment");
const checkAuthMiddle = require("../middlewares/checkAuthMiddle");

router.post("/",checkAuthMiddle,payment);


module.exports = router;